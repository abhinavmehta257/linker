
const jwt = require('jsonwebtoken');

auth = function (req,res,next) {
    console.log(req);
   const token = req.cookies['token'];
   console.log('token', token);
   if(!token) return res.status(401).send();
   console.log('try');

   try{
       const verified  = jwt.verify(token, process.env.TOKEN_SECRET);
       req.user = {_id:verified.id,userName:'abhinav'};
        console.log('authenticated');
       next();
   }catch(err){
       res.status(403).send({title:'403',error_code:'403', error_message:'Forbidden Error.'});
   }
}


module.exports.auth = auth;