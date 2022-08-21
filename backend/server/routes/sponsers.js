const router = require('express').Router();
const Page = require('../../models/page');
const {auth} = require('../helpers/validToken');

router.post('/updateSponser',auth, async (req, res) => {
    console.log(req.body);
    try{
     var newSponsers = await Page.updateOne({userId:req.user._id, 'sponsers.id':req.body.id},{'sponsers.$':req.body});
        
    }catch(err){
        console.log(err);
    }
    if(!newSponsers){
     return res.status(400).send("Error");
    }
    res.send(newSponsers);
});

router.post('/addSponser',auth, async (req, res) => {
    console.log(req.body);
    try{
        var newSponsers = await Page.updateOne({userId:req.user._id},{
            $push:{
                sponsers:{
                    $each:[req.body],
                    $position:0
                }
            }
        });
        
    }
    catch(err){
        console.log(err);
    }
    if(!newSponsers){
      return  res.status(400).send("Error");
    }
    res.send(newSponsers);
} );


router.post('/deleteSponser',auth, async (req, res) => {
    console.log(req.body);
    if(!req.body.id) return res.status(400).send("Error id not found");
    try{
        var newSponsers = await Page.updateOne({userId:req.user._id},{
            $pull:{
                sponsers:{
                    id:req.body.id
                }
            }
        });
        
    }
    catch(err){
        console.log(err);
    }
    if(!newSponsers){
        return  res.status(400).send("Error");
    }
    res.send(newSponsers);
} );


module.exports = router;