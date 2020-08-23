const { Model } = require('objection');

class Companies extends Model {
    // Table name is the only required property.

    static get tableName() {
        return 'companies';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                // Properties defined as objects or arrays are
                // automatically converted to JSON strings when
                // writing to database and back to objects and arrays
                // when reading from database. To override this
                // behaviour, you can override the
                // Model.jsonAttributes property.
            benefits: {
                type: 'array',
                properties: {
                    benefit : { type: 'string' },
                }
            }
    }
    }
    
}
static get relationMappings() {
    const JobsModel = require("./jobsModels");
        return {
            jobs :{
                relation : Model.HasManyRelation,
                modelClass : JobsModel,
                join : {
                    from : "companies.jobId",
                    to : "jobs.id"
                }
            }
        }
    }
    
}
module.exports = Companies;