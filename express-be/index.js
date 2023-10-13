// Server backend file for react project

// 
const express = require('express')

// mondodb models
const {BlogPostModel} = require('./models/BlogPostModel');
const {ImageModel} = require('./models/ImageModel');
const {UserAuthModel} = require('./models/UserAuthModel');


const jwt = require("jsonwebtoken"); 
const uuid = require('uuid');
// 
const cookieParser = require('cookie-parser');


// Establish Mongoose/MondoDB connection
const mongoose = require('mongoose');
const mongoPath = 'mongodb://127.0.0.1:27017/bc3photo'

//later, leverage dotenv for safety
const secretKey = "secretkeyappearshere";


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
const path = require('path');

// Increase payload size limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const bodyParser = require('body-parser');
const { decode } = require('punycode');


app.use(bodyParser.json());
app.use(cookieParser());


////////////////////////////////
// route definitions
////////////////////////////////

app.use(express.static(path.join(__dirname, 'build')));

function checkHTMLReceived(req, res, next) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    // res.cookie('visited', 'true');
    console.log('sending html...')
    next();
}


// function checkHTMLReceived(req, res, next) {
//     console.log('checking for html...');
//     console.log(req.cookies.visited)
//     if (!req.cookies.visited) {
//         res.sendFile(path.join(__dirname, 'build', 'index.html'));
//         res.cookie('visited', 'true');
//         console.log('sending html...')
//     }
//     next();
// }


// get the initial html 

app.get('/blogdata', async function (req, res) {

    console.log('initiating get /blog route.')
    try {
        const data = await BlogPostModel.find();
        console.log('blah')
        console.log(data);
        res.json(data);

    } catch(e){
    console.error('Error in GET /blogo;', e);
    res.status(500).json({error: 'Internal Server Error'})
    }
});




app.get('/*', checkHTMLReceived, function(req, res){
    console.log('routing to next middleware...');
});

// // // post for saving a post// do i want to say /posts/save? for this post request? 
app.post('/blogpost', async function(req, res) {
    let postData = req.body;
    // save the body to the data base
    // postData = addTimeToPost(postData); 
    
    const newPost = new BlogPostModel({
        authorId: postData.authorId, 
        title: postData.title, 
        date: postData.date,
        blogBody: postData.blogBody, 
        cover: postData.cover
    })

    await newPost.save()

    // console.log('heres time updated post data: ', postData);
    // savePost(postData); 
    let myResponse = {'response': 'Your post has been successfully saved!'}
    res.json(myResponse);
});



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


function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Use optional chaining

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
        return res.status(403).json({ message: 'Token is not valid' });     // verify if this is the right msg to send
        }
        req.user = user; // Attach user information to the request
        next();
    });
}




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

app.post('/login', async function(req, res, next) {
    let {email, password} = req.body;
    let existingUser; 
    try {
        console.log(email)
        existingUser = await UserAuthModel.findOne({email: email});

        
    } catch {
        const error = new Error("Error: (1) Email and/or Password is not found.")
        return next(error);
    }

    console.log('checking...')
    if (!existingUser || existingUser.password != password) {
        const error = new Error("Error: (2) Email and/or Password is not found.")
        return next(error);
    }

    let token;
    try { 
        token = jwt.sign(
            { user_id: existingUser._id, email: existingUser.email }, 
            secretKey, 
            { expiresIn: "1hr" }
        );
    } catch (e) {
        const error = new Error("unable to create auth flow.");
        return next(error);
    }
    res
        .status(201)
        .json({
            success: true, 
            data: { 
                    token: token
            },

        });
});






// now lets login and generate a token





// establish the BE listener
let PORT = 8080

app.listen(PORT, function(){
    console.log(`App running on port = ${PORT}.`)
});