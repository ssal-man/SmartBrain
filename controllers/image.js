
const handleImage=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id','=',id)
    .increment('enteries',1)
    .returning('enteries')
    .then(enteries=>{
        res.json(enteries[0])
    })
    .catch(err=>{
        res.json("unable to get enteries")
    })
}
module.exports={
    handleImage:handleImage
}    