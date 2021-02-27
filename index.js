const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
mongoose.connect('mongodb+srv://Kang:Kang123@englishcluster.uecjh.mongodb.net/test?retryWrites=true&w=majority')
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

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }  
});

//============================USER SCHEMA===============================//

//============================LESSON SCHEMA===============================//

var lessonSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    examples: {
        type: String,
        required: true
    },
    tests: {
        type: Boolean,
        required: true,
        default: false,
    }  
});


//============================USER SCHEMA===============================//



//=====================authorization=========================//

function authorization(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Unauthorized action.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next()
    }
    catch{
        res.status(400).send('invalid token')
    }
}

function isadmin(req, res, next){
    console.log(req.user.isAdmin)
    if (!(req.user.isAdmin)) return res.status(403).send(req.user.isAdmin);
        next();
    }

//============================SCHEMA===============================//

//============================TEST FUNCTIONS===============================//

var User = mongoose.model('User', userSchema);

async function addUserTest(email, password, userName){ //this is a test function
    const user = new User({
        email: email,
        password: password,
        userName: userName
    });
    const result = await user.save();
    console.log(result);
    };  
    
    app.get('/api/', (req, res) => {
        res.send('successfully loaded')
       });
//============================TEST FUNCTIONS===============================//

//============================REGISTER NEW ACCOUNT===============================//

    const registerSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
        userName: Joi.string().required().min(1),
      });

    app.post('/api/register', async (req, res) =>{
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);


        let user = new User({
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName,
        });
        console.log(user);

        const validation = registerSchema.validate(req.body);

        let emailExist = await User.findOne({ email: req.body.email });
            if (!emailExist && !(validation.error)) 
            {
            const result = await user.save();
            const token = jwt.sign({ _id: user._id, email: user.email, userName: user.userName, isAdmin: user.isAdmin }, config.get('jwtPrivateKey'));
            res
            .header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token').send({
                _id: user._id,
                email: user.email,
                userName: user.userName,
                isAdmin: user.isAdmin
            });
            console.log(token);
            }
            else{
            return res.status(400).send('Big error');
            }
    });
    //============================REGISTER NEW ACCOUNT END===============================//


    //============================    authen ACCOUNT   ===============================//

    const authSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
      });

    app.post('/api/auth', async (req, res) =>{
        console.log(req.body)
        const validation = authSchema.validate(req.body);
        if (validation.error) return res.status(400).send('invalid username or password');
        let userExist = await User.findOne({ email: req.body.email });
        if (!userExist) return res.status(400).send('Invalid email or password');
        const valid = await bcrypt.compare(req.body.password, userExist.password);
        if (!valid) return res.status(400).send('Invalid email or password');
        const token = jwt.sign({ _id: userExist._id, email: userExist.email, userName: userExist.userName, isAdmin: userExist.isAdmin }, config.get('jwtPrivateKey'));
        res.send(token);
    });

//===========================Get account info===================//

    app.get("/api/me", authorization, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  });

  app.get("/api/me2", [authorization, isadmin], async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  });



    

    //addUserTest('testemail@gmail.com', '12345', 'testman');
    
    

    

    