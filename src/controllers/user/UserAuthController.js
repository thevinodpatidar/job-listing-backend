const user = require("../../models/userModel");
const { to, badRequestError, okResponse } = require("../../global_functions");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../middlewares/authenticate");

const SignUp = async(req,res)=>{
    console.log('SignUp');
    let data = req.body;

    const [error,userCreated] = await to(user.query().skipUndefined().insert(data).returning("*"));
    if(error) badRequestError(res,error.message);
    
    delete userCreated.password;

    okResponse(res,userCreated,"User Successfully Created");
}

const Login = async(req,res)=>{
    console.log('Login');
    let data = req.body;
    if(!data.email || !data.password) return badRequestError(res,"Enter complete details");

    let [error,userexist] = await to(user.query().skipUndefined().where("email",data.email).first().throwIfNotFound());
    if(error) return badRequestError(res,"Invalid Email");
    console.log(userexist)
    await bcrypt.compare(data.password,userexist.password,(err,success)=>{
        if(err) return badRequestError(res,"Incorrect Passwor");
        if(success){
            let token = generateAccessToken({id:userexist.id,email:data.email},'1800s');

            return okResponse(res,token,"User Logged In");
        }
    })
    
}



module.exports = {
    SignUp,
    Login
}