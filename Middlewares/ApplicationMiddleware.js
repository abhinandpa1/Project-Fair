const ApplicationMiddlewares=(req,res,next)=>{
    console.log("Inside the ApplicationMiddlewares");
   next() 
}
module.exports=ApplicationMiddlewares