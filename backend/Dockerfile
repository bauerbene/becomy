FROM rust:latest as builder

WORKDIR /usr/src/becomy
COPY . .
RUN SQLX_OFFLINE=true cargo install --path .


FROM gcr.io/distroless/cc-debian10
# RUN apt-get update && apt-get install -y extra-runtime-dependencies && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/be_co_my /usr/local/bin/be_co_my

WORKDIR /usr/becomy

COPY ./static/ ./static/

EXPOSE 5005

COPY --from=builder /usr/src/becomy/static /usr/becomy/static

# ENV DATABASE_URL=postgresql://becomy_db_user:becomy_db_password@becomy_db:5006/becomy

CMD ["be_co_my"]
