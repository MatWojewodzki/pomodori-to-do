use crate::db::DbPools;
use crate::error::RepositoryError;
use crate::todo_list::domain::TodoList;
use crate::todo_list::repository::TodoListRepository;
use async_trait::async_trait;
use sqlx::FromRow;

#[derive(FromRow)]
pub struct TodoListRow {
    pub id: String,
    pub title: String,
    pub order_key: i32,
}

pub struct TodoListRepositorySqlite {
    pools: DbPools,
}

impl TodoListRepositorySqlite {
    pub fn new(pools: DbPools) -> Self {
        Self { pools }
    }
}

impl TodoListRepositorySqlite {
    fn todo_list_to_row(todo_list: TodoList) -> TodoListRow {
        TodoListRow {
            id: todo_list.id,
            title: todo_list.title,
            order_key: todo_list.order_key,
        }
    }
    fn todo_list_from_row(row: TodoListRow) -> TodoList {
        TodoList {
            id: row.id,
            title: row.title,
            order_key: row.order_key,
        }
    }
}

#[async_trait]
impl TodoListRepository for TodoListRepositorySqlite {
    async fn get_todo_lists(&self) -> Result<Vec<TodoList>, RepositoryError> {
        let q = "SELECT * FROM todo_list ORDER BY order_key";
        let query = sqlx::query_as::<_, TodoListRow>(q);
        let rows = query.fetch_all(&self.pools.reader).await?;
        Ok(rows
            .into_iter()
            .map(TodoListRepositorySqlite::todo_list_from_row)
            .collect())
    }

    async fn create_todo_list(&self, todo_list: TodoList) -> Result<(), RepositoryError> {
        let row = TodoListRepositorySqlite::todo_list_to_row(todo_list);
        let q = "INSERT INTO todo_list (id, title, order_key) VALUES (?, ?, ?)";
        let query = sqlx::query(q)
            .bind(row.id)
            .bind(row.title)
            .bind(row.order_key);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn get_greatest_order_key(&self) -> Result<i32, RepositoryError> {
        let q = "SELECT MAX(order_key) FROM todo_list";
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
        let q = "UPDATE todo_list SET order_key = order_key + ? WHERE order_key > ?";
        let query = sqlx::query(q).bind(delta).bind(order_key);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn update_order_key(&self, id: String, order_key: i32) -> Result<(), RepositoryError> {
        let q = "UPDATE todo_list SET order_key = ? WHERE id = ?";
        let query = sqlx::query(q).bind(order_key).bind(id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn get_todo_list_by_index(&self, index: u32) -> Result<TodoList, RepositoryError> {
        let q = "SELECT * FROM todo_list ORDER BY order_key LIMIT 1 OFFSET ?";
        let query = sqlx::query_as::<_, TodoListRow>(q).bind(index);
        let row = query.fetch_one(&self.pools.reader).await?;
        Ok(TodoListRepositorySqlite::todo_list_from_row(row))
    }

    async fn get_adjacent(
        &self,
        gap_index: u32,
    ) -> Result<(Option<TodoList>, Option<TodoList>), RepositoryError> {
        let q = "SELECT * FROM todo_list ORDER BY order_key LIMIT ? OFFSET ?";
        let query = sqlx::query_as::<_, TodoListRow>(q)
            .bind(if gap_index == 0 { 1 } else { 2 })
            .bind(if gap_index == 0 { 0 } else { gap_index - 1 });
        let rows = query.fetch_all(&self.pools.reader).await?;
        let tasks = rows
            .into_iter()
            .map(TodoListRepositorySqlite::todo_list_from_row)
            .collect::<Vec<_>>();

        Ok(match (gap_index == 0, tasks.as_slice()) {
            (true, [next]) => (None, Some(next.clone())),
            (false, [prev, next]) => (Some(prev.clone()), Some(next.clone())),
            (false, [prev]) => (Some(prev.clone()), None),
            (_, []) => (None, None),
            _ => unreachable!(),
        })
    }

    async fn delete_todo_list(&self, id: String) -> Result<(), RepositoryError> {
        let q = "DELETE FROM todo_list WHERE id = ?";
        let query = sqlx::query(q).bind(id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }
}
