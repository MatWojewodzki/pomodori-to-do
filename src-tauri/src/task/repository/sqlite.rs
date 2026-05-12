use crate::db::DbPools;
use crate::error::RepositoryError;
use crate::task::domain::Task;
use crate::task::repository::TaskRepository;
use async_trait::async_trait;
use sqlx::FromRow;

#[derive(FromRow)]
pub struct TaskRow {
    pub id: String,
    pub text: String,
    pub pomodoro_total: u32,
    pub pomodoro_completed: u32,
}

pub struct TaskRepositorySqlite {
    pools: DbPools,
}

impl TaskRepositorySqlite {
    pub fn new(pools: DbPools) -> Self {
        Self { pools }
    }
}

impl TaskRepositorySqlite {
    fn task_to_row(task: Task) -> TaskRow {
        TaskRow {
            id: task.id,
            text: task.text,
            pomodoro_total: task.pomodoro_total,
            pomodoro_completed: task.pomodoro_completed,
        }
    }
    fn task_from_row(row: TaskRow) -> Task {
        Task {
            id: row.id,
            text: row.text,
            pomodoro_total: row.pomodoro_total,
            pomodoro_completed: row.pomodoro_completed,
        }
    }
}

#[async_trait]
impl TaskRepository for TaskRepositorySqlite {
    async fn get_tasks(&self) -> Result<Vec<Task>, RepositoryError> {
        let q = "SELECT * FROM task";
        let query = sqlx::query_as::<_, TaskRow>(q);
        let rows = query.fetch_all(&self.pools.reader).await?;
        Ok(rows
            .into_iter()
            .map(TaskRepositorySqlite::task_from_row)
            .collect())
    }

    async fn create_task(&self, task: Task) -> Result<(), RepositoryError> {
        let row = TaskRepositorySqlite::task_to_row(task);
        let q =
            "INSERT INTO task (id, text, pomodoro_total, pomodoro_completed) VALUES (?, ?, ?, ?)";
        let query = sqlx::query(q)
            .bind(row.id)
            .bind(row.text)
            .bind(row.pomodoro_total)
            .bind(row.pomodoro_completed);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn update_task(&self, updated_task: Task) -> Result<(), RepositoryError> {
        let row = TaskRepositorySqlite::task_to_row(updated_task);
        let q = "UPDATE task SET text = ?, pomodoro_total = ?, pomodoro_completed = ? WHERE id = ?";
        let query = sqlx::query(q)
            .bind(row.text)
            .bind(row.pomodoro_total)
            .bind(row.pomodoro_completed)
            .bind(row.id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn delete_task(&self, id: String) -> Result<(), RepositoryError> {
        let q = "DELETE FROM task WHERE id = ?";
        let query = sqlx::query(q).bind(id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn increment_pomodoro_completed(&self, id: String) -> Result<(), RepositoryError> {
        let q = "UPDATE task SET pomodoro_completed = pomodoro_completed + 1 WHERE id = ?";
        let query = sqlx::query(q).bind(id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }
}
