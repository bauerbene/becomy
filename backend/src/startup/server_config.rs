use std::net;

use actix_cors::Cors;
use actix_web::{middleware::Logger, web::Data, App, HttpServer};

use sqlx::{Pool, Postgres};

use crate::controller::contact;

pub struct AppState {
    pub db: Pool<Postgres>,
}

pub async fn configure_and_start_server<A>(address: A, pool: Pool<Postgres>) -> std::io::Result<()>
where
    A: net::ToSocketAddrs,
{
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("debug"));
    HttpServer::new(move || {
        let cors = Cors::default().allowed_origin("http://localhost:5173");
        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .app_data(Data::new(AppState { db: pool.clone() }))
            .configure(contact::configure)
    })
    .bind(address)?
    .run()
    .await
}
