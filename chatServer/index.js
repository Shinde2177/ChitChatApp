const express =require ('express');
const app=express();
const http= require('http')
const cors=require("cors");

const {Server}=require("socket.io")

app.use(cors());
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","PUT","POST","DELETE","OPTIONS"],
    }
})

 
io.on("connection",(socket)=>{
console.log(`user connected with id->${socket.id}`);

        socket.on("join_room",(data)=>{
            socket.join(data);
            console.log(`user with id ${socket.id } joined room ${data}`)
        })
        
        socket.on("send_msg",(data)=>{
            console.log(data);

            socket.to(data.room).emit("msg_recived",data);
            
        })

        socket.on("disconnect",()=>{
            onsole.log("user disconnected->",socket.id)
         })

})

server.listen(3001,()=>{
    console.log("server listening on port 3001.......");
})