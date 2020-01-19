

const handleRegister=(req,res,db,bcrypt)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password)
    {
        return res.json("Wrong Input given");
    }
    var hash = bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginemail=>{
            return trx('users')
            .returning('*')
            .insert({
                email:email,
                name:name,
                joined:new Date()
            }).then(user=>{res.json(user[0])})
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>{
        res.json("unable to register")})
    
}

module.exports={
    handleRegister:handleRegister
}