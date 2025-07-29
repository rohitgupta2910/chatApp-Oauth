require("dotenv").config();
const userModel = require('./models/user.model.js')
const chatModel = require('./models/chat.model.js')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt')
const http = require('http');
const express = require('express')
const app = express();
app.use(cookie())

const dbConnect = require('./config/db.config.js');
const { timeStamp } = require("console");

dbConnect();

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set('view engine', 'ejs');
const server = http.createServer(app);

//middleware isLoggedIn
const isLoggedIn = async (req,res,next)=>{
    // console.log(req.cookies);
    
    const {token} = req.cookies ;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
    if(!decoded){
        res.status(401).send("User Not Logged In")
        res.redirect('/');
    }
    // console.log(decoded);
    req.user = await userModel.findById(decoded.id);
    // console.log(req.user);
    next();
}

// homepage
app.get("/", (req, res) => {
  res.render('homepage');
});


// signUp
app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',async (req,res)=>{
    const {displayName,email,image,password} = req.body ;
    console.log(req.body);
    
    try {
    const user = await userModel.create({displayName,email,image,password})
    if(!user){
         res.status(401).send("User not created successfully")
    }
    //Setting token
    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)

    res.redirect('/chat')
    } catch (error) {
        res.status(401).send(error);
    }    
})

// login & logout
app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',async (req,res)=>{
    const {email,password} = req.body ;
    console.log(req.body)
    const user = await userModel.findOne({email});
    if(!user){
        res.status(401).send("Invalid Username or Password")
    }
    const userPassword = user.password ;
    // console.log(user); // console.log(userPassword); // console.log(password);
    
    const isMatch = await bcrypt.compare(password,userPassword) ;

    if(!isMatch) res.status(401).send("Invalid Username or Password")
    
    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET)
    
    res.cookie("token",token)
    // res.status(201).send(req.cookies)
    res.redirect('/chat')
})

app.get('/logout',async (req,res)=>{
    res.cookie("token","");
    res.redirect('/')
    // res.status(201).send("Logout Successfully")
})

//chatPage
app.get('/chat',isLoggedIn ,async (req, res) => {
    try {
        // Get the user ID from the JWT token
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find current user and all users
        const currentUser = await userModel.findById(decoded.id);
        const users = await userModel.find({ _id: { $ne: decoded.id } }); // Exclude current user
        
        res.render("chat", { 
            users,
            currentUser 
        });
    } catch (error) {
        res.redirect('/login');
    }
});

app.get('/getChat/:id', isLoggedIn,async (req,res) => {
    const receiverId = req.params.id;
    const rec = await userModel.findById(receiverId);
    const senderId = req.user._id;
    const sen = await userModel.findById(senderId);
    //console.log("reciever --- > "+ rec);
    console.log("current user -- >" + req.user);
    const allChats = await chatModel.find({
        $or: [
        {senderId:senderId,receiverId:receiverId}, 
        {senderId:receiverId,receiverId:senderId}
        ]
    }).sort({timestamp:1})
    console.log(allChats);
    //api se data bhejne k liye res.json ka istemaal krte hai
    res.json({allChats})
})

const io = require('socket.io')(server);

io.on('connection',  (socket) => {
    // console.log("connected");
    socket.on('join' , async (data)=> {
        // console.log("SocketId -> " + socket.id);
        // console.log(data);
        
        const user  = await userModel.findById(data); //middleware se user mila _ lagana zruri hai since mongodb
        user.socketId = socket.id;
        await user.save();

    })

    socket.on('send-message',async(data)=>{
        // console.log(data)
        const {message,receiverId,senderId} = data;
        // console.log(receiverId);
        
        const chatMessage = await chatModel.create({
            senderId,
            receiverId,
            message,
            timeStamp:Date.now()
        })
        // console.log(to)
        // console.log(from)
        //onsole.log("ReceiverId ->"+receiverId)
        const receiver = await userModel.findById(receiverId) ;
        //console.log(receiver.socketId);
        
        //console.log("Receiving user socketId -> " +receiverSocketId);
        
        socket.to(receiver.socketId).emit("receive-message", {
        message,
        senderId,
        receiverId,}
    
    );
    })

})

server.listen(process.env.PORT,()=>{
    console.log("Server connected to PORT" + process.env.PORT);  
})