
exports.up = function(knex) {
  return knex.schema.createTable('wish', (table)=>{
     table.integer('userId').notNull();
     table.foreign('userId').references('users.userId');
     table.integer('petId').notNull();
     table.foreign('petId').references('pets.petId');
     table.timestamp('saved_at').defaultTo(knex.fn.now());
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('wish');
};
