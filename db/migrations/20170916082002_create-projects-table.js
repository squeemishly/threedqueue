exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE projects(
    id SERIAL PRIMARY KEY NOT NULL,
    admin_id INTEGER REFERENCES admins(id),
    customer_id INTEGER REFERENCES customers(id),
    name TEXT,
    approval_status INTEGER,
    approval_initials TEXT,
    approval_status_chage_date TIMESTAMP,
    in_queue BOOLEAN,
    preferred_color INTEGER,
    customer_comments TEXT,
    acknowledgement BOOLEAN,
    file_path TEXT,
    print_status INTEGER,
    print_status_change_date TIMESTAMP,
    created_at TIMESTAMP
    )`
  return knex.raw(createQuery)
}

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE projects`
  return knex.raw(dropQuery)
}