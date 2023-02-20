use actix_web::{
    get, post,
    web::{self, ServiceConfig},
    HttpResponse, Responder, delete,
};
use serde::{Deserialize, Serialize};

use crate::{entities::contact::ContactEntity, startup::server_config::AppState};

pub fn configure(conf: &mut ServiceConfig) {
    let scope = web::scope("/api/contact")
        .service(get_contacts)
        .service(get_contact)
        .service(add_contact)
        .service(update_contact)
        .service(delete_contact);

    conf.service(scope);
}

#[get("")]
pub async fn get_contacts(data: web::Data<AppState>) -> impl Responder {
    println!("hello in bla");
    let query_result: sqlx::Result<Vec<ContactEntity>> = sqlx::query_as!(
        ContactEntity,
        "SELECT id, first_name, last_name, phone, email FROM contacts"
    )
    .fetch_all(&data.db)
    .await;

    return match query_result {
        Ok(contact_data) => HttpResponse::Ok().json(contact_data),
        Err(_) => HttpResponse::InternalServerError().finish(),
    };
}

#[get("/{id}")]
pub async fn get_contact(path: web::Path<i32>, data: web::Data<AppState>) -> impl Responder {
    let id = path.into_inner();
    let query_result: sqlx::Result<ContactEntity> = sqlx::query_as!(
        ContactEntity,
        "SELECT id, first_name, last_name, phone, email FROM contacts WHERE id = $1",
        id
    )
    .fetch_one(&data.db)
    .await;

    return match query_result {
        Ok(contact_data) => HttpResponse::Ok().json(contact_data),
        Err(_) => HttpResponse::InternalServerError().finish(),
    };
}

#[post("/add")]
pub async fn add_contact(
    body: web::Json<AddContactRequest>,
    data: web::Data<AppState>,
) -> impl Responder {
    let query_result: sqlx::Result<ContactEntity> = sqlx::query_as!(
        ContactEntity, 
        "INSERT INTO contacts (first_name, last_name, phone, email) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, phone, email", 
        body.first_name, 
        body.last_name, 
        body.phone, 
        body.email
    )
    .fetch_one(&data.db)
    .await;

    return match query_result {
        Ok(contact_data) => HttpResponse::Ok().json(contact_data),
        Err(_) => HttpResponse::InternalServerError().finish()
    };
}

#[post("/update/{id}")]
pub async fn update_contact(body: web::Json<UpdateContactRequest>, path: web::Path<i32>, data: web::Data<AppState>) -> impl Responder {
    let id = path.into_inner();
    let query_result: sqlx::Result<ContactEntity> = sqlx::query_as!(
        ContactEntity, 
        "UPDATE contacts SET (first_name, last_name, phone, email) = ($1, $2, $3, $4) WHERE id = $5 RETURNING id, first_name, last_name, phone, email",
        body.first_name,
        body.last_name,
        body.phone,
        body.email,
        id
    )
    .fetch_one(&data.db)
    .await;

    return match query_result {
        Ok(contact_data) => HttpResponse::Ok().json(contact_data),
        Err(_) => HttpResponse::InternalServerError().finish()
    };
}

#[delete("/delete/{id}")]
pub async fn delete_contact(path: web::Path<i32>, data: web::Data<AppState>) -> impl Responder {
    let id = path.into_inner();
    let query_result: sqlx::Result<ContactEntity> = sqlx::query_as!(
        ContactEntity,
        "DELETE FROM contacts WHERE id = $1 RETURNING id, first_name, last_name, phone, email",
        id
    )
    .fetch_one(&data.db)
    .await;
    
    return match query_result {
        Ok(contact_data) => HttpResponse::Ok().json(contact_data),
        Err(_) => HttpResponse::InternalServerError().finish(),
    };
}

#[derive(Deserialize, Serialize, Debug)]
pub struct AddContactRequest {
    first_name: Option<String>,
    last_name: Option<String>,
    phone: Option<String>,
    email: Option<String>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UpdateContactRequest {
    first_name: Option<String>,
    last_name: Option<String>,
    phone: Option<String>,
    email: Option<String>,
}
