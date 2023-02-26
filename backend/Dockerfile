FROM rust:1.67 as builder

WORKDIR /usr/src/becomy
COPY . .
RUN SQLX_OFFLINE=true cargo install --path .

RUN cp -r ./static ./target/release/

FROM debian:bullseye-slim
# RUN apt-get update && apt-get install -y extra-runtime-dependencies && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/be_co_my /usr/local/bin/be_co_my

WORKDIR /usr/becomy
EXPOSE 8080
EXPOSE 5005

COPY --from=builder /usr/src/becomy/static /usr/becomy/static

ENV DATABASE_URL=postgresql://becomy_db_user:becomy_db_password@becomy_db:5432/becomy

CMD ["be_co_my"]
