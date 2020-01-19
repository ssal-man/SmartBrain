

const handleProfle=(req,res,db)=>{
    const {id}=req.params;
    db.select('*').from('users').where({
        id:id
    })
    .then(user=>{
        if(user.length){
        res.json(user[0])}
        else{
            res.json("not found")
        }
    })

}

module.exports={
    handleProfle:handleProfle
}