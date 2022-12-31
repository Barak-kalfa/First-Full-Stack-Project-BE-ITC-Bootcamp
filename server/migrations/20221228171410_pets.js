
exports.up = function(knex) {
  return knex.schema.createTable('pets', (table)=>{
     table.increments('petId').primary();
     table.string('type').notNull();
     table.string('name').notNull();
     table.string('adoptionStatus');
     table.string('picture').notNull();
     table.string('breed');
     table.string('bio');
     table.float('height');
     table.float('weight');
     table.string('color');
     table.boolean('hypoallerganic');
     table.string('dietary');
     table.integer('ownerId');
     table.integer('fosterId');
     table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('pets');
};
