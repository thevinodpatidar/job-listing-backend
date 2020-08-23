
exports.up = async function(knex) {
  await knex.schema.createTable('jobs',function(table){
      table.increments('id').primary();
      table.string('jobName').notNullable();
      table.enum("location",['remote','onsite']);
      table.string('jobType');
      table.jsonb("address");
      table.string("latitude");
      table.string("longitude");
    //   table.string("category");
      table.integer('recruiterId').unsigned().references("id").inTable("users").onDelete("CASCADE");
      table.string("salary");
      table.string("workWeek");
      table.string("description");
      table.jsonb("technologies");
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('jobs');
};
