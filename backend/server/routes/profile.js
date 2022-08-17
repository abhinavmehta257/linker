const router = require('express').Router();
const Page = require('../../models/page');
const {auth} = require('../helpers/validToken');

router.post('/updateProfile',auth, async (req, res) => {
    console.log(req.body);
    try{
     var newLink = await Page.updateOne({userId:req.user._id},{
         $set:{
             profile:req.body
         }
     });
         
    }catch(err){
        console.log(err);
    }
    if(!newLink){
     return res.status(400).send("Error");
    }
    res.send(newLink);
} );

module.exports = router;