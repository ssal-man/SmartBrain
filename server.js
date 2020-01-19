const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const knex=require('knex');
const bcrypt=require('bcrypt-nodejs');
const register=require('./controllers/register');
const image=require('./controllers/image');
const profile=require('./controllers/profile');
const signin=require('./controllers/signin');

const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
  });


app.use(bodyParser.json())
app.use(cors());


app.get('/',(req,res)=>{
  res.json("it is working");
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});


app.get('/profile/:id',(req,res)=>{profile.handleProfle(req,res,db)});


app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});


app.put('/image',(req,res)=>image.handleImage(req,res,db));

app.listen(process.env.PORT||3000,()=>{
    console.log("Working")
})