const router = require('express').Router();
const Page = require('../../models/page');
const {registerValidation, loginValidation} = require('../helpers/validation');
const {auth} = require('../helpers/validToken');



router.get('/',auth, async (req, res) => {
    const pages = await Page.find({userId:req.user._id});
    res.send(pages);
} );






module.exports = router;