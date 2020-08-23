
// User Model 
'use strict'

const { Model, ValidationError } = require('objection');
const validator = require('validator');
const { to } = require("../global_functions");
const bcrypt = require("bcrypt");

class User extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        username : { type : "string" },
      }
    };
  }

//  Model Hooks ( these hook runs before insert query in database ).

  async $beforeInsert(res) {

    console.log('in before insert');
    if(this.password === ''){
      throw new ValidationError({
        message: "Please enter a password",
        type: "ModelValidation"
      })
    }
    if (!validator.isEmail(this.email || '')) {
      throw new ValidationError({
        message: "Not a valid email address!",
        type: "ModelValidation",
      })
    }
    let err,result;
    [err,result] = await to(this.constructor.query().select('id').where('email', this.email).first());
    console.log(err);
    if (result) {
      throw new ValidationError({
        message: "Account with this email already exists!",
        type: "UniqueViolationError",
      });
    }

    this.password ? this.password = await bcrypt.hash(this.password, 10) : null;

  }

  static get relationMappings(){    
    const JobModel = require("./jobsModels")
    return {
      recruiterJobs : {
        relation : Model.HasManyRelation,
        modelClass : JobModel,
        join : {
          from : "user.id",
          to : "jobs.recruiterId"
        }
      }
    }
  }

}

module.exports = User;