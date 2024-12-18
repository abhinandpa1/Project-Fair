const jwt = require ('jsonwebtoken')

const jwtMiddlewares=(req,res,next)=>{
    console.log("Inside the jwtnMiddlewares");
   try {
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    
    //token verify ? 
    jwtTokenVerification = jwt.verify(token,process.env.jwtkey)
    console.log(jwtTokenVerification);
    req.payload = jwtTokenVerification.userId
    next()
   } catch (err) {
    res.status(401).json("Please Login")
    console.log(err);
    
   }
}
module.exports=jwtMiddlewares