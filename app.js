const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;
const {v4:uuidv4} = require('uuid');

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

io.on('connection',socket=>{
    socket.on('newuser',name=>{

        socket.broadcast.emit('user','new user connected',name);
        socket.on('message',(time,msg,id,name)=>{
            io.emit('newMessage',time,msg,id, name);
        })

        })
        socket.on('join-room',(roomId,id)=>{
            socket.join(roomId);
            socket.to(roomId).broadcast.emit('user-connected',id);
            
            socket.on('disconnect',()=>{
                io.to(roomId).emit('user-disconnected',id);
            })
            socket.on('dis-connect',()=>{
                socket.to(roomId).broadcast.emit('user-disconnected',id);
            })
        })
})

app.get('/',(req,res)=>{
    res.redirect('/chat/'+uuidv4());
})

app.get('/chat/:room',(req,res)=>{
    res.render('index',{id:req.params.room})
})

app.get('/video',(req,res)=>{
    res.render('video-template',{newLink:uuidv4()});
})
app.post('/video',(req,res)=>{
    var link = req.body.link;
        res.redirect('/video/'+link);
})

app.get('/video/:room',(req,res)=>{
    res.render('video',{id:req.params.room});
})

app.get('/voice',(req,res)=>{
    res.render('voice-template',{id:uuidv4()});
})


app.post('/voice',(req,res)=>{
    var link = req.body.link;
        res.redirect('/voice/'+link);
})
app.get('/voice/:room',(req,res)=>{
    res.render('voice',{id:req.params.room});
})



















server.listen(PORT,console.log('server is started at port '+PORT));