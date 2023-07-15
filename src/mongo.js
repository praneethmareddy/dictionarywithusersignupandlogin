const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://saip9091:saip9091@cluster0.6jrp6as.mongodb.net/LogInSignUpTutorial")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log(e);
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('collection1',logInSchema)

module.exports=LogInCollection