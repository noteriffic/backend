exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments();

      table
        .string("username", 20)
        .notNullable()
        .unique();

      table.string("password").notNullable();

      table.string("email", 60).notNullable();

      table.string("country", 60).notNullable();
    })
    .createTable("notes", table => {
      table.increments();

      table.string("title", 120);

      table.text("body");

      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
