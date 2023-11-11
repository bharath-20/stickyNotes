const knex = require("knex");

const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "database.sqlite3",
  },
  useNullAsDefault: true,
});

connectedKnex.schema
  .hasTable("users")
  .then((exists) => {
    if (!exists) {
      return connectedKnex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("userId").unique().notNullable();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.string("role").notNullable();
      });
    }
  })
  .then(() => console.log("Users table is ready"))
  .catch((err) => console.error(err));

  connectedKnex.schema
  .hasTable("Note")
  .then((exists) => {
    if (!exists) {
      return connectedKnex.schema.createTable('Note', (table) => {
        table.increments('id').primary();
        table.string('userId');
        table.text('title');
        table.text('content');
        table.text('created_at').defaultTo(connectedKnex.fn.now());
        table.text('updated_at').defaultTo(connectedKnex.fn.now());
        table.integer('visibility').defaultTo(0);
      });
    }
  })
  .then(() => console.log("Notes table is ready"))
  .catch((err) => console.error(err));

  connectedKnex.schema
  .hasTable('invites')
  .then((exists) => {
    if (!exists) {
      return connectedKnex.schema.createTable('invites', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('token').notNullable().unique();
        table.timestamps(true, true); 
      });
    }
  })
  .then(() => console.log('Invites table is ready'))
  .catch((err) => console.error(err));

module.exports = connectedKnex;
