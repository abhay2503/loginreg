const express=require('express')

const app=express()

const mongoose = require('mongoose')


// mongoose intialization

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://abhay:Abhay%40123@cluster0.xowgujp.mongodb.net/loginreg?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//User Schema
const userSchema = new mongoose.Schema({
    name: String,
    secondname: String,
    email:String,
    phone:String
});

const user=mongoose.model("user",userSchema)
  



app.get('/login',async (req,res)=>{
    let {name,secondname,phone}=req.body

    if (name== undefined || name==""||phone== undefined || phone=="")
    res.status(401).send('Please fill important fields');
    else{

        const user=await user.findOne({name,phone});

        if(user){
            res.send(name)
        }
        else{
            res.status(401).send('User not found');
        }
    }

})

const port=5000
app.listen(port,()=>{console.log(`server is running in port:`+port)})