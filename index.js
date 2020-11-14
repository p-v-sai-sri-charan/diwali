const express = require('express');
const path = require("path");
const hbs = require('hbs');
const User = require("./models/user.js")
const bodyParser =require("body-parser");
const mongoose = require('mongoose');

var cors = require('cors')
const cryptoRandomString = require('crypto-random-string');

const app = express();
app.use(cors())
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.set('view engine', 'hbs');
app.set('views', path.resolve("./views"));
app.use(express.static('views/img'))
const PORT = process.env.PORT || 5000;
const db = process.env.MONGO_URL
mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
app.get('/', (req, res) => {
    res.render( 'index');
    });
app.get('/:id',async(req,res)=>{
    if(!req.params.id) return res.status(400).json({message:"Couldn't find the id"})
    try {
      User.findOne({string:req.params.id}).then((user)=>{
          if(!user) return res.status(400).json({message:"Couldn't find the id"})
          res.status(200).json({data:user.userName})
      })
    } catch (error) {
        res.status(400).json({data:error.message})
    }
})

app.post('/new',async(req,res)=>{
    if(!req.body.userName) return res.status(203).json({message:"please fill all fields"})
    const newUser = new User({...req.body, string:cryptoRandomString({length: 6, type: 'alphanumeric'})})
    const user = await newUser.save();
    const data = user.string
    res.status(200).json({data:data})
})
app.listen(PORT, console.log(`Server started on port ${PORT}`));