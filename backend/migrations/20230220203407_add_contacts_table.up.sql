CREATE TABLE IF NOT EXISTS CONTACTS (
    ID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    FIRST_NAME TEXT,
    LAST_NAME TEXT,
    PHONE TEXT,
    EMAIL TEXT UNIQUE
);