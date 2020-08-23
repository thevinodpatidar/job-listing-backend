
exports.up = async function(knex) {
    await knex.schema.createTable('companies',function(table){
        table.increments('id').primary();
        table.string('companyName').notNullable();
        table.string('companyEmail');
        table.string('industries');
        table.string('companySize');
        table.text('aboutCompany');
        table.jsonb('benefits');
        table.string("externalUrl");
        table.string("companyLogo");
        table.integer('jobId').unsigned().references("id").inTable("jobs").onDelete("CASCADE");
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
  };
  
  exports.down = async function(knex) {
      await knex.schema.dropTableIfExists('companies');
  };
  