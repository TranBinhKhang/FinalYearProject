const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/dbtest')
.then(() => console.log('Successfully connected to online database. Amazing goodjob em.'))
.catch(error => console.error('Unable to connect. This app is a failure, just like your life.'));

if (!config.get('jwtPrivateKey')) {
console.error('CRITICAL ERROR: NUCLEAR PAYLOAD WILL DETONATE. just kidding you forgot to set private key or something');
process.exit(1);
}

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({ limit: '5000000mb' }))
app.use(bodyParser.urlencoded({
  limit: '5000000mb',
  extended: false,
}));
app.use(express.json());

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Backend server live on " + port));

//=================================


var Owner = mongoose.model('Owner', mongoose.Schema({
  name: String,
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
}))
Car = mongoose.model('Car', mongoose.Schema({
  brand: String
}))

Owner.findById(ownerId, function (err, owner) {
  if (err) console.log(err)

  const c = new Car({ brand: 'Toyota' })

  owner.cars.push(c)
  owner.save()
  console.log(owner.cars) // prints out an array containing multiple car _ids, everything working so far
})

Owner.findById(ownerId).populate('cars').exec(function (err, owner) {
  if (err) console.log(err)
  console.log(owner) //this only returns one object 
})