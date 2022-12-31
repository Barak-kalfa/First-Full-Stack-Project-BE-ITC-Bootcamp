exports.up = function (knex) {
     return knex.schema.createTable("users", (table) => {
          table.increments("userId").primary();
          table.string("firstName", 100).notNull();
          table.string("lastName", 100).notNull();
          table.string("email").notNull();
          table.integer("phone").notNull();
          table.text("bio");
          table.string("password").notNull();
          table.timestamp("dateCreated").defaultTo(knex.fn.now());
     });
};

exports.down = function (knex) {
     return knex.schema.dropTable("users");
};
