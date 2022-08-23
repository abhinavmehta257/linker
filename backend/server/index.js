const express = require('express');
const app = express();
const cors = require('cors');
const linksRoute = require('./routes/links');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const webPageRoute = require('./routes/webpage');
const profileRoute = require('./routes/profile');
const sponserRoute = require('./routes/sponsers');
const themeRoute = require('./routes/themes');
const cookieParser = require('cookie-parser');
const Page = require('../models/page');
dotenv = require('dotenv').config();


//connect to db;
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },()=>{
  console.log("db connected");
});

app.use(express.json());

app.use(express.urlencoded());

app.use(cookieParser());
// 
var whitelist = [process.env.WHITELIST1, process.env.WHITELIST2]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cors(corsOptions));


app.use('/links', linksRoute);
app.use('/sponsers', sponserRoute);

app.use('/auth', authRoute);
app.use('/page', webPageRoute);
app.use('/profile',profileRoute)
app.use('/themes',themeRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.get('/:userName', async (req, res) => {
  console.log(req.params.userName);
  const page = await Page.findOne({userName:req.params.userName});
  if(!page){
    return res.status(404).send("Page not found");
  }
  res.send(page);
} );
app.get('/',(req,res)=>{
    console.log('page');
    res.send('hello');
})





app.listen(process.env.PORT || 3001, () => {
    console.log('Example app listening on port:'+process.env.PORT);
});
