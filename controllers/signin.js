
const handleSignin=(req,res,db,bcrypt)=>{
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data=>{
       const isValid= bcrypt.compareSync(req.body.password, data[0].hash); // true
    
    if(isValid)
    {
        return db.select('*').from('users')
        .where('email','=',req.body.email)
        .then(user=>{
            res.json(user[0])
        })
        .catch(err=>{res.json("unable to get user")})
    } 
    else{
        res.json("wrong credentials")
    }
})
.catch(err=>{
    res.json('wrong credential')
})
}

module.exports={
    handleSignin:handleSignin
}