const router = require('express').Router();
const Page = require('../../models/page');
const {auth} = require('../helpers/validToken');

router.post('/updateLink',auth, async (req, res) => {
    console.log(req.body);
    try{
     var newLink = await Page.updateOne({userId:req.user._id, 'links.id':req.body.id},{'links.$':req.body});
        
    }catch(err){
        console.log(err);
    }
    if(!newLink){
     return res.status(400).send("Error");
    }
    res.send(newLink);
});

router.post('/addLink',auth, async (req, res) => {
    console.log(req.body);
    try{
        var newLink = await Page.updateOne({userId:req.user._id},{
            $push:{
                links:{
                    $each:[req.body],
                    $position:0
                }
            }
        });
        
    }
    catch(err){
        console.log(err);
    }
    if(!newLink){
      return  res.status(400).send("Error");
    }
    res.send(newLink);
} );


router.post('/deleteLink',auth, async (req, res) => {
    console.log(req.body);
    if(!req.body.id) return res.status(400).send("Error id not found");
    try{
        var newLink = await Page.updateOne({userId:req.user._id},{
            $pull:{
                links:{
                    id:req.body.id
                }
            }
        });
        
    }
    catch(err){
        console.log(err);
    }
    if(!newLink){
        return  res.status(400).send("Error");
    }
    res.send(newLink);
} );


module.exports = router;