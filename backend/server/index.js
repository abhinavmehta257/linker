const express = require('express');
const app = express();
const cors = require('cors');
const links = require('./routes/links');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const webPageRoute = require('./routes/webPage');
const profileRoute = require('./routes/profile');
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

app.use(cors({
    origin: '*',
}))


app.use('/links', links);

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
// app.get('/page',(req,res)=>{
//     console.log('page');
//     res.send(page);
// })





app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});