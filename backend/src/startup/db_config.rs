use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

pub async fn configure_database() -> Pool<Postgres> {
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    println!("{db_url}");
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Database pool could not be established");

    sqlx::migrate!().run(&pool).await.expect("Migration failed");
    pool
}
