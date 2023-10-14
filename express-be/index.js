// Server backend file for react project

// 
const express = require('express')
const cors = require('cors'); // Import the cors package

require('dotenv').config();

const dbPort = process.env.DB_PORT;

// routes exports
const {authenticateRoutes} = require('./routes/authenticateRoutes');
const getRoutes = require('./routes/getRoutes')
const postRoutes = require('./routes/postRoutes')

// Establish Mongoose/MondoDB connection
const mongoose = require('mongoose');
const mongoPath = 'mongodb://127.0.0.1:27017/bc3photo'


// establish mongoose connection
mongoose.connect(mongoPath)
    .then(() => {
        console.log("Connected to bc3photo")
    })
    .catch (() => {
        console.log('Error connectingt to bc3photo')
    })

// instantiate and import 
const app = express();

const bodyParser = require('body-parser');
const { decode } = require('punycode');

////////////////////////////////
app.use(bodyParser.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Allow requests from http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
}));


////////////////////////////////
// route definitions
////////////////////////////////

app.use('/', authenticateRoutes);
app.use('/', getRoutes);
app.use('/', postRoutes);


// app.post('/image', async function(req, res) {
//     let data = req.body;
//     const now = new Date();
//     const timestamp = now.toISOString();
//     const newImage = new ImageModel({
//         filename: data.filename,
//         file: data.file,
//         date: timestamp
//     })

//     await newImage.save()

//     // console.log('heres time updated post data: ', postData);
//     // savePost(postData); 
//     let myResponse = {'response': 'Your post has been successfully saved!'}
//     res.json(myResponse);
// });



////////////////////////////////////////
// sample calls below
////////////////////////////////////////

// get top posts
// app.get('/posts/top', authenticateToken, async function (req, res) {
//     const data = await BlogPost.find()
//     console.log(data)
//     res.json(data);
// });



// // post for saving a post// do i want to say /posts/save? for this post request? 
// app.post('/posts', async function(req, res) {
//     let postData = req.body;
//     // save the body to the data base
//     // postData = addTimeToPost(postData); 

//     const now = new Date();
//     const timestamp = now.toISOString();

//     const newPost = new BlogPost({
//         title: postData.title, 
//         body: postData.body, 
//         date: timestamp
//     })

//     await newPost.save()

//     // console.log('heres time updated post data: ', postData);
//     // savePost(postData); 
//     let myResponse = {'response': 'Your post has been successfully saved!'}
//     res.json(myResponse);
// });


// // signup route 
// app.post('/signup', async function(req, res) {

//     async function generateUUID() {
//         try {
//             while(true) {
//                 const potentialUUID = uuid.v4();
//                 const existingUser = await User.findOne({userId: potentialUUID});

//                 if (!existingUser) {
//                     return potentialUUID
//                 }
//             }
//         } catch {
//             console.log("shit fucked up with generating unique UUID");
//         }
//     }

//     try {
//         let postData = req.body;

//         //ensure the email is not a dupe 
//         const existingUser = await User.findOne({email: postData.email})
//         if (existingUser) {
//             res.status(409).json({error: 'Email already in use'});
//             return 
//         }

//         // get ready to save the new user
//         const now = new Date();
//         const timestamp = now.toISOString();
//         console.log(postData.email, postData.password);
//         const userId = await generateUUID();

//         const newUser = new User({
//             userId: userId, 
//             email: postData.email, 
//             date: timestamp, 
//             password: postData.password
//         });
    
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully', user: newUser });

//     } catch(error) {
//         console.error(error.message)
//         res.status(500).json({error: 'Internal server error' });
//     }


// });


// establish the BE listener
app.listen(dbPort, function(){
    console.log(`App running on port = ${dbPort}.`)
});