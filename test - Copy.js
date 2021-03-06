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

//============================USER SCHEMA===============================//

              
var Clip = mongoose.model('Clip', mongoose.Schema({
    clipName: String,
    content: String,
    data: String
}));


var Movie = mongoose.model('Movie', mongoose.Schema({
    movieName: String,
    desc: String,
    clips: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clip'
    }
}));


async function createClip(clipName, content, data) {
    const clip = new Clip({
        clipName,
        content,
        data
    });
    const result = await clip.save();
};

async function createMovie(movieName, desc, clips) {
    const movie = new Movie({
        movieName,
        desc,
        clips
    });
    const result = await movie.save();

};

async function listMovies() {
    const movies = await Movie
    .find()
    .populate('clips')
    .select('movieName clips');
    console.log(movies);
}

listMovies();

// createClip('Avenger Noun', 'Iron Man uses noun', 'data2');
// createMovie('Avenger 2', 'Earth heroes and shit 2', '60366a22bce5580be40345f5');


//============================USER SCHEMA===============================//

//============================LESSON SCHEMA===============================//




//============================USER SCHEMA===============================//




    

    //addUserTest('testemail@gmail.com', '12345', 'testman');
    
    

    

    