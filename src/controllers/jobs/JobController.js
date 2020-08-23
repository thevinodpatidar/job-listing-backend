const Jobs = require("../../models/jobsModels");
const { to, badRequestError, okResponse, notFoundError } = require("../../global_functions");

const AddJob = async(req,res)=>{

    let data = req.body;
    data.recruiterId = req.user.id
    let [error,entryCreated] = await to(Jobs.query().skipUndefined().insertGraph(data).returning("*"));
    if(error) return badRequestError(res,error);

    return okResponse(res,entryCreated,"Job Created")
}

const GetJobs = async(req,res)=>{

    let [error,entryFound] = await to(Jobs.query().skipUndefined().withGraphFetched('company').throwIfNotFound());

    if(error) return notFoundError(res,"No record found");

    return okResponse(res,entryFound,"Job list");
}

const GetJobWithId = async(req,res)=>{

    let { id } = req.params;

    let [error,entryFound] = await to(Jobs.query().skipUndefined().where("id",id).withGraphFetched('company').throwIfNotFound());

    if(error) return notFoundError(res,"No record found");

    return okResponse(res,entryFound,"Job found");
}

const UpdateJob = async(req,res)=>{

}

const RemoveJob = async(req,res)=>{

}


module.exports = {
        AddJob,
        GetJobs,
        GetJobWithId
}