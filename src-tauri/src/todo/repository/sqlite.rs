use super::TodoRepository;
use crate::db::DbPools;
use crate::error::RepositoryError;
use crate::todo::domain::Todo;
use async_trait::async_trait;
use sqlx::FromRow;

#[derive(FromRow)]
pub struct TodoRow {
    pub id: String,
    pub text: String,
    pub completed: i8,
    pub order_key: i32,
}

pub struct TodoRepositorySqlite {
    pools: DbPools,
}

impl TodoRepositorySqlite {
    pub fn new(pools: DbPools) -> Self {
        Self { pools }
    }
}

impl TodoRepositorySqlite {
    fn todo_to_row(todo: Todo) -> TodoRow {
        TodoRow {
            id: todo.id,
            text: todo.text,
            completed: if todo.completed { 1 } else { 0 },
            order_key: todo.order_key,
        }
    }
    fn todo_from_row(row: TodoRow) -> Todo {
        Todo {
            id: row.id,
            text: row.text,
            completed: row.completed != 0,
            order_key: row.order_key,
        }
    }
}

#[async_trait]
impl TodoRepository for TodoRepositorySqlite {
    async fn get_todos(&self) -> Result<Vec<Todo>, RepositoryError> {
        let q = "SELECT * FROM todo ORDER BY order_key";
        let query = sqlx::query_as::<_, TodoRow>(q);
        let rows = query.fetch_all(&self.pools.reader).await?;
        Ok(rows
            .into_iter()
            .map(TodoRepositorySqlite::todo_from_row)
            .collect())
    }

    async fn create_todo(&self, todo: Todo) -> Result<Todo, RepositoryError> {
        let row = TodoRepositorySqlite::todo_to_row(todo);

        let mut tx = self.pools.writer.begin().await?;

        let q = "INSERT INTO todo (id, text, completed, order_key) VALUES (?, ?, ?, ?)";
        let query = sqlx::query(q)
            .bind(row.id.clone())
            .bind(row.text)
            .bind(row.completed)
            .bind(row.order_key);
        query.execute(&mut *tx).await?;

        let q = "SELECT id, text, completed, order_key FROM todo WHERE id = ?";
        let created = sqlx::query_as::<_, TodoRow>(q)
            .bind(row.id)
            .fetch_one(&mut *tx)
            .await?;

        tx.commit().await?;
        Ok(TodoRepositorySqlite::todo_from_row(created))
    }

    async fn delete_todo(&self, id: String) -> Result<(), RepositoryError> {
        let q = "DELETE FROM todo WHERE id = ?";
        let query = sqlx::query(q).bind(id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn set_completed(&self, id: String, completed: bool) -> Result<(), RepositoryError> {
        let q = "UPDATE todo SET completed = ? WHERE id = ?";
        let query = sqlx::query(q).bind(if completed { 1 } else { 0 }).bind(id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn get_greatest_order_key(&self) -> Result<i32, RepositoryError> {
        let q = "SELECT MAX(order_key) FROM todo";
        let order_key: Option<i32> = sqlx::query_scalar(q)
            .fetch_optional(&self.pools.reader)
            .await?;
        Ok(order_key.unwrap_or(0))
    }

    async fn shift_order_keys_greater_than(
        &self,
        order_key: i32,
        delta: i32,
    ) -> Result<(), RepositoryError> {
        let q = "UPDATE todo SET order_key = order_key + ? WHERE order_key > ?";
        let query = sqlx::query(q).bind(delta).bind(order_key);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn update_order_key(&self, id: String, order_key: i32) -> Result<(), RepositoryError> {
        let q = "UPDATE todo SET order_key = ? WHERE id = ?";
        let query = sqlx::query(q).bind(order_key).bind(id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn get_todo(&self, index: u32) -> Result<Todo, RepositoryError> {
        let q = "SELECT * FROM todo ORDER BY order_key LIMIT 1 OFFSET ?";
        let query = sqlx::query_as::<_, TodoRow>(q).bind(index);
        let row = query.fetch_one(&self.pools.reader).await?;
        Ok(TodoRepositorySqlite::todo_from_row(row))
    }

    async fn get_adjacent(
        &self,
        gap_index: u32,
    ) -> Result<(Option<Todo>, Option<Todo>), RepositoryError> {
        let q = "SELECT * FROM todo ORDER BY order_key LIMIT ? OFFSET ?";
        let query = sqlx::query_as::<_, TodoRow>(q)
            .bind(if gap_index == 0 { 1 } else { 2 })
            .bind(if gap_index == 0 { 0 } else { gap_index - 1 });
        let rows = query.fetch_all(&self.pools.reader).await?;
        let todos = rows
            .into_iter()
            .map(TodoRepositorySqlite::todo_from_row)
            .collect::<Vec<_>>();

        Ok(match (gap_index == 0, todos.as_slice()) {
            (true, [next]) => (None, Some(next.clone())),
            (false, [prev, next]) => (Some(prev.clone()), Some(next.clone())),
            (false, [prev]) => (Some(prev.clone()), None),
            (_, []) => (None, None),
            _ => unreachable!(),
        })
    }
}
