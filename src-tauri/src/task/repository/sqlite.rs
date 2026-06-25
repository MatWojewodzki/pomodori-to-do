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
    pub completed: bool,
    pub order_key: i32,
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
            completed: task.completed,
            order_key: task.order_key,
        }
    }
    fn task_from_row(row: TaskRow) -> Task {
        Task {
            id: row.id,
            text: row.text,
            pomodoro_total: row.pomodoro_total,
            pomodoro_completed: row.pomodoro_completed,
            completed: row.completed,
            order_key: row.order_key,
        }
    }
}

#[async_trait]
impl TaskRepository for TaskRepositorySqlite {
    async fn get_task(&self, id: String) -> Result<Task, RepositoryError> {
        let q = "SELECT * FROM task WHERE id = ?";
        let query = sqlx::query_as::<_, TaskRow>(q).bind(id);
        let row = query.fetch_one(&self.pools.reader).await?;
        Ok(TaskRepositorySqlite::task_from_row(row))
    }

    async fn get_tasks(&self) -> Result<Vec<Task>, RepositoryError> {
        let q = "SELECT * FROM task ORDER BY order_key";
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
            "INSERT INTO task (id, text, pomodoro_total, pomodoro_completed, completed) VALUES (?, ?, ?, ?, ?, ?)";
        let query = sqlx::query(q)
            .bind(row.id)
            .bind(row.text)
            .bind(row.pomodoro_total)
            .bind(row.pomodoro_completed)
            .bind(row.completed)
            .bind(row.order_key);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn update_task(&self, updated_task: Task) -> Result<(), RepositoryError> {
        let row = TaskRepositorySqlite::task_to_row(updated_task);
        let q = "UPDATE task SET text = ?, pomodoro_total = ?, pomodoro_completed = ?, order_key = ? WHERE id = ?";
        let query = sqlx::query(q)
            .bind(row.text)
            .bind(row.pomodoro_total)
            .bind(row.pomodoro_completed)
            .bind(row.order_key)
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

    async fn set_completed(&self, id: String, completed: bool) -> Result<(), RepositoryError> {
        let q = "UPDATE task SET completed = ? WHERE id = ?";
        let query = sqlx::query(q).bind(completed).bind(id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn get_greatest_order_key(&self) -> Result<i32, RepositoryError> {
        let q = "SELECT MAX(order_key) FROM task";
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
        let q = "UPDATE task SET order_key = order_key + ? WHERE order_key > ?";
        let query = sqlx::query(q).bind(delta).bind(order_key);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn update_order_key(&self, id: String, order_key: i32) -> Result<(), RepositoryError> {
        let q = "UPDATE task SET order_key = ? WHERE id = ?";
        let query = sqlx::query(q).bind(order_key).bind(id);
        query.execute(&self.pools.writer).await?;
        Ok(())
    }

    async fn get_task_by_index(&self, index: u32) -> Result<Task, RepositoryError> {
        let q = "SELECT * FROM task ORDER BY order_key LIMIT 1 OFFSET ?";
        let query = sqlx::query_as::<_, TaskRow>(q).bind(index);
        let row = query.fetch_one(&self.pools.reader).await?;
        Ok(TaskRepositorySqlite::task_from_row(row))
    }

    async fn get_adjacent(
        &self,
        gap_index: u32,
    ) -> Result<(Option<Task>, Option<Task>), RepositoryError> {
        let q = "SELECT * FROM task ORDER BY order_key LIMIT ? OFFSET ?";
        let query = sqlx::query_as::<_, TaskRow>(q)
            .bind(if gap_index == 0 { 1 } else { 2 })
            .bind(if gap_index == 0 { 0 } else { gap_index - 1 });
        let rows = query.fetch_all(&self.pools.reader).await?;
        let tasks = rows
            .into_iter()
            .map(TaskRepositorySqlite::task_from_row)
            .collect::<Vec<_>>();

        Ok(match (gap_index == 0, tasks.as_slice()) {
            (true, [next]) => (None, Some(next.clone())),
            (false, [prev, next]) => (Some(prev.clone()), Some(next.clone())),
            (false, [prev]) => (Some(prev.clone()), None),
            (_, []) => (None, None),
            _ => unreachable!(),
        })
    }
}
