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
        }
    }
    fn todo_from_row(row: TodoRow) -> Todo {
        Todo {
            id: row.id,
            text: row.text,
            completed: row.completed != 0,
        }
    }
}

#[async_trait]
impl TodoRepository for TodoRepositorySqlite {
    async fn get_todos(&self) -> Result<Vec<Todo>, RepositoryError> {
        let q = "SELECT * FROM todo";
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

        let q = "INSERT INTO todo (id, text, completed) VALUES (?, ?, ?)";
        let query = sqlx::query(q)
            .bind(row.id.clone())
            .bind(row.text)
            .bind(row.completed);
        query.execute(&mut *tx).await?;

        let q = "SELECT id, text, completed FROM todo WHERE id = ?";
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
}
