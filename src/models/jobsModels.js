const { Model } = require('objection');

class Jobs extends Model {
    // Table name is the only required property.

    static get tableName() {
        return 'jobs';
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
            technologies: {
                type: 'array',
                properties: {
                    technology : { type: 'string' },
                }
            }
        }
    }
    
}
static modifiers = {

}

static get relationMappings() {
    const CompanyModel = require("./companiesModel");
    const RecruiterModel = require("./userModel");
    return {
        company : {
            relation : Model.HasOneRelation,
            modelClass : CompanyModel,
            join : {
                from : "jobs.id",
                to : "companies.jobId"
            }
        },
        recruiter : {
            relation : Model.BelongsToOneRelation,
            modelClass : RecruiterModel,
            join : {
            from : "jobs.recruiterId",
            to : "users.id"
            }
        }
        }
    }
    
}
module.exports = Jobs;