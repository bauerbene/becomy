use std::net;

use actix_cors::Cors;
use actix_files::NamedFile;
use actix_web::{
    middleware::Logger,
    web::{self, Data},
    App, HttpServer, Responder,
};

use sqlx::{Pool, Postgres};

use crate::controller::contact;

pub struct AppState {
    pub db: Pool<Postgres>,
}

async fn index() -> impl Responder {
    let file = NamedFile::open_async("static/index.html").await.unwrap();
    println!("hello in index");
    println!("{:?}", file);
    file
}

pub async fn configure_and_start_server<A>(address: A, pool: Pool<Postgres>) -> std::io::Result<()>
where
    A: net::ToSocketAddrs,
{
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("debug"));
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .supports_credentials();
        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .app_data(Data::new(AppState { db: pool.clone() }))
            .configure(contact::configure)
            .service(web::resource("/").to(index))
            .service(
                actix_files::Files::new("/", "./static")
                    .show_files_listing()
                    .use_last_modified(true),
            )
        //.route("/{filename:.*}", web::get().to(static_content))
    })
    .bind(address)?
    .run()
    .await
}
