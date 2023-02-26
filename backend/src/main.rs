mod controller;
mod entities;
mod startup;

use crate::startup::db_config::configure_database;
use crate::startup::server_config::configure_and_start_server;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db_pool = configure_database().await;
    configure_and_start_server(("0.0.0.0", 8080), db_pool).await
}
