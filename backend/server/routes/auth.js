const router = require('express').Router();
const User = require("../../models/User");
const Page = require("../../models/page");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../helpers/validation');
const newPage = {
    appearance:{
        bodyStyle:{
          backgroundColor:"#11bc5e",
          color:"#ffff",
        },
        cardStyle:{
            color:"#fff",
            backgroundColor:"#00bc5e",
            borderColor:"#fff",
            shadow:"none",
            borderRadius:"10px",
            borderWidth:"2px"
        },
    },
    profile:{
        profileTitle:"Jhon Doe",
        profileImage:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
        profileBio:"I am a web developer and I love to code.",
    },
    links:[
        {
            id:1,
            type:"link",
            enabled:true,
            title:"Home",
            url:"/",
            icon:"home",
            image:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
            
        },{
          id:2,
          type:"link",
          enabled:false,
          title:"Home",
          url:"https://www.youtube.com/watch?v=VkXjvHfP3MM",
          icon:"home",
          image:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
          
        },{
          id:3,
          type:"link",
          enabled:false,
          title:"Home",
          url:"/",
          icon:"home",
          image:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
        },{
        id:4,
        type:"link",
        enabled:false,
        title:"Home",
        url:"https://open.spotify.com/track/1x5sYLZiu9r5E43kMlt9f8?si=66278edd02024d98",
        icon:"home",
        image:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      },
      {
        id:6,
        type:"link",
        enabled:false,
        title:"Home",
        url:"https://open.spotify.com/track/1x5sYLZiu9r5E43kMlt9f8?si=66278edd02024d98",
        icon:"home",
        image:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      }
    ]
  }


router.post("/register",async (req,res)=>{

    // Validation
    const {error} = registerValidation(req.body);
    //creatw new user
    if(error) return res.status(400).send({error:error.details[0].message});


    //check user exist 
    const userNameExist = await User.findOne({userName:req.body.userName});

    if(userNameExist) return res.status(400).send({error:'User alredy exist please login'});
    
    //hash
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name:req.body.name,
        userName:req.body.userName,
        password:hashedPassword,
    });
    const page = new Page({
        userId:user._id,
        userName:user.userName,
        appearance:{
            bodyStyle:{
                backgroundColor:"#11bc5e",
                color:"#ffff"
            },
                cardStyle:{
                    color:"#fff",
                    backgroundColor:"#00bc5e",
                    borderColor:"#fff",
                    shadow:"none",
                    borderRadius:"10px",
                    borderWidth:"2px"
                }
        },
        profile:{
            profileTitle:"Jhon Doe",
            profileImage:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            profileBio:"I am a web developer and I love to code.",
        },
        links:[],
        sponsers:[]
    });
    try {
        await page.save();
        await user.save(); 
        res.status(200).send({user:user});
    } catch (error) {
        res.status(400).send(error); 
    }
});

router.post("/login",async (req,res)=>{
     // Validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send({title:'Login',error:error.details[0].message});
    //check user exist 
    const user = await User.findOne({userName:req.body.userName});
    if(!user) return res.status(400).send({error:"User Name Or Password is wrong"});
    //check pass
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
       return res.status(400).send({error:"User Name Or Password is wrong"});
    }else{
    //create auth token
      const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET);
      res.setHeader('auth-token', token);
      console.log(token);
      res.send({token});
    }
},function(err) {
  console.log(err);
});

router.get('/logout',(req,res)=>{
  res.cookie('authentication','',{maxAge: 1});
  res.redirect('/');
})

module.exports = router;