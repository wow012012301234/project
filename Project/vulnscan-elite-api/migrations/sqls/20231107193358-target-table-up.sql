/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS target(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name VARCHAR(64) UNIQUE NOT NULL, 
    value VARCHAR ARRAY NOT NULL, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);  
