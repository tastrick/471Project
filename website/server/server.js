var app = require("express")();
var http = require("http");
const {spawn} = require('child_process');
var cors = require("cors");

var {Server} = require("socket.io"); 
app.use(cors());
var mysql = require('mysql2');


let provs = ["Alberta", "saskatchewan","manitoba","ontario","quebec","new brunswick", "nova scotia", "newfoundland & labrador", "prince edward island", "british columbia", "nunavut", "yukon", "northwest territories"];

var connectCounter = 0;

var server = http.createServer(app)
var io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
    
})

var users = [];
//start server for whiteboard
const con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '1012',
    database: 'CanadianAmmenities'
});
con.connect((err) => {

  if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
  //console.log("MySql Connected");

});
//let sqlcommand = "SELECT * FROM city"
//con.query(sqlcommand, (err,result) => {
//        if (err) throw err;
//        console.log('All cities:',result);
//});
io.on('connection',(socket)=>{
    //socket.emit('recieve-id',socket.id)
    
    //dont need conditional, any time this point is reached, socket.id is unique by definition
    users.push(socket.id)
    
    console.log(users)
    io.emit('recieve-users',users)
    //socket.emit('recieve-id',socket.id
    //console.log('sending data frm server')
    //console.log('User Online# '+connectCounter);
    socket.on('getBounds', (data) => {
        let strProv = provs[data];
        let sqlquery2 = 'SELECT * FROM bounds AS b WHERE b.name = '+'\''+strProv+'\'';
        con.query(sqlquery2, (err,result) => {
            if (err) throw err;
            console.log(result);
            socket.emit('sendingBound', result);
             
        });
        
    })
    socket.on('getCities', (data) =>{
        let strProv = provs[data];
        
        console.log('returning cities for: ', data);
        
        console.log(strProv)
        let sqlquery = 'SELECT * FROM city AS c WHERE c.PTname = '+'\''+strProv+'\'';
        con.query(sqlquery, (err,result) => {
            if (err) throw err;
            console.log(result);
             socket.emit('sendingCities', result);
             
        });
        
       
    })
    
    socket.on('getUsers',() =>{
        console.log("sending users")
        io.emit('recieve-users',users)
    })
    socket.on('disconnect', () => {
        users.pop(socket.id);
        io.emit("recieve-users",users)
        console.log("User: ", socket.id,"left",users)
        
        socket.broadcast.emit("callEnded")
    })
   
    socket.on('endCall', () =>{
        console.log('sending end call signal')
        io.emit("callEnded")
        
    })
    socket.on('callUser',(data) =>{
        console.log("user making call")
        socket.broadcast.emit("incomingCall",{signal: data.signal, type: data.type})
    })
    socket.on('answerCall',(data) =>{
        console.log("user answering call")
        socket.broadcast.emit("callAccepted",data.signal)
    })
    socket.on('someMute', () => {
        console.log("a user is muting")
        socket.broadcast.emit("userMuted")
    })
    
}) 


var port = 3001
server.listen(port,() => {
    console.log("started server on: "+port)
});

//var whiteBoard_port = process.env.YOUR_PORT || process.env.PORT || 5000;
//http.listen(whiteBoard_port, ()=>{
//        console.log("started on: "+whiteBoard_port);
//})

// next set up server for chat

