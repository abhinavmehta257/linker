const router = require('express').Router();
const Page = require('../../models/page');
const themes = require('../../models/themes');

router.get('/', async (req, res) => {
    const themesList = await themes.find({});
    console.log(themesList);
    res.send(themesList);
} );

router.put('/update',auth, async (req, res) => {
    console.log(req.body);
    try{
        var updatedPage = await Page.updateOne({userId:req.user._id},{
            $set:{
                appearance:req.body
            }
        });
            
       }catch(err){
           console.log(err);
       }
    console.log(updatedPage);
    res.send();
});

router.get('/addthemes', async (req, res) => {
    const newTheme = new themes({
        "appearance": {
            "bodyStyle": {
              "backgroundColor": "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);",
              "color": "#1b1e1f"
            },
            "cardStyle": {
              "color": "#2a3235",
              "backgroundColor": "#ffffff",
              "borderColor": "#ffffff",
              "shadow": "none",
              "borderRadius": "10px",
              "borderWidth": "1px"
            }
        }
    });
    const savedTheme = await newTheme.save();
    res.send(savedTheme);
} );

module.exports = router;