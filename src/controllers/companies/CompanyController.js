const { to, badRequestError, okResponse } = require("../../global_functions");
const Companies = require("../../models/companiesModel");

const AddCompany = async(req,res)=>{
    console.log('Add Company');
    let data = req.body;

    let [error,entryCreated] = await to(Companies.query().skipUndefined().insertGraph(data).returning("*"));
    if(error) return badRequestError(res,"Error, Entry not created");

    return okResponse(res,entryCreated,"Company Created")
}


module.exports = {
        // AddCompany
}