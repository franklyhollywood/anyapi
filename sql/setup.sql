-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS projectors;

CREATE TABLE  projectors (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  size TEXT NOT NULL
);