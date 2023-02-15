
const express = require('express');
const mongoose = require('mongoose');
const user = require('./user')

const app = express();

app.use(express.json());

mongoose.set('strictQuery',false);

mongoose.connect("mongodb+srv://paramesh:paramesh@cluster0.hl1zdom.mongodb.net/test?retryWrites=true&w=majority").then(()=>{
    console.log('DB Connected');
});

app.post('/signup',async (req,res)=>{
    try{
    const {name,email,password,confirmpassword} = req.body;
    const exist = await user.findOne({email});
        if(exist){
            return res.status(400).send('email already exist')
        }
        if(password !== confirmpassword){
            return res.status(400).send('password not matched')
        }
        let newUser = new user({
            name,email,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('user registered successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('network error')
    }
});



app.get('/',(req,res)=>{
    res.send('Hello World');
    res.end();
});

app.listen(8080,()=>console.log('server running...'));