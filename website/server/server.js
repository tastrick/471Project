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
    host:'canadianammenities.cjvwv8uwmfuy.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'xkOROcz8J0YcRBEcWXhw',
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
        let sqlquery2 = 'SELECT * FROM Bounds AS b WHERE b.name = '+'\''+strProv+'\'';
        con.query(sqlquery2, (err,result) => {
            if (err) throw err;
            console.log(result);
            socket.emit('sendingBound', result);
             
        });
        
    })
    socket.on('getpops', (data) => {
        //this will need to be changed if names are not unique
        let sql = 'SELECT gl.population FROM GeneralLocation AS gl WHERE gl.name = '+'\''+data+'\''
        con.query(sql, (err,result) => {
            if (err) throw err;
            console.log(result);
            socket.emit('sendingPops', result);
            
        });
    })
    socket.on ('deleteCity', (data) =>{
        let sql1 = 'DELETE FROM House WHERE House.cname = '+'\''+data+'\''
         con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('successfully removed all houses in city')
             
        });
         sql1 = 'DELETE FROM Job WHERE Job.cname = '+'\''+data+'\''
         con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('successfully removed all Jobs in city')
             
        });
         sql1 = 'DELETE FROM Store WHERE Store.cname = '+'\''+data+'\''
         con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('successfully removed all stores in city')
             
        });
         sql1 = 'DELETE FROM School WHERE School.cname = '+'\''+data+'\''
         con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('successfully removed all schools in city')
             
        });
         sql1 = 'DELETE FROM CommunitySupport WHERE CommunitySupport.cname = '+'\''+data+'\''
         con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('successfully removed all comsup in city')
             
        });
        sql1 = 'DELETE FROM City WHERE City.name = '+'\''+data+'\''
        con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('successfully removed city')
             
        });
        sql1 = 'DELETE FROM GeneralLocation WHERE GeneralLocation.name = '+'\''+data+'\''
        con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('successfully removed general location')
             
        });
    })
    socket.on('addCity', (data) =>{
        let sql1 = 'INSERT INTO GeneralLocation VALUES ('+'\''+data.name+'\''+','+'\''+data.long+'\''+','+'\''+data.lat+'\''+','+'\''+data.pop+'\''+','+'\''+0+'\')'
        
        let sql2 = 'INSERT INTO City VALUES('+'\''+data.name+'\''+','+'\''+data.long+'\''+','+'\''+data.lat+'\''+','+'\''+'\''+','+'\''+0+'\''+','+'\''+data.pname+'\''+','+'\''+data.plong+'\''+','+'\''+data.plat+'\')'
        
        //console.log('call to add city',data)
         con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('adding general location successful ')
             
        });
         con.query(sql2, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('adding c successful ')
             
        });
        
        
        //let strProv = provs[data];
        
        //console.log('returning cities for: ', data);
        
        //console.log(strProv)
        let sqlquery = 'SELECT * FROM City AS c WHERE c.PTname = '+'\''+data.pname+'\'';
       con.query(sqlquery, (err,result) => {
            if (err) throw err;
            console.log(result);
             socket.emit('sendingCities', result);
             
        });
    })
    socket.on('addAmmenity', (data) =>{
        //adding ammenities means adding to city location and actuall ammenity table
        
        let sql1 = ''
        let sql2 = ''
        let r = Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 4);
        if (data.ammenityType==0){//house
           //console.log('requesting add ammenity', data)
            //city location sql
            sql1 = 'INSERT INTO CityLocation VALUES ('+'\''+r+'\''+','+'\''+0.0+'\''+','+'\''+0.0+'\''+','+'\''+data.type+'\''+','+'\''+data.lat+'\''+','+'\''+data.long+'\''+','+'\''+'\''+','+'\''+'\''+','+'\''+data.link+'\')'
            //house sql
            sql2 = 'INSERT INTO House VALUES('+'\''+r+'\''+','+'\''+data.squareFootage+'\''+','+'\''+data.description+'\''+','+'\''+data.rent+'\''+','+'\''+data.type+'\''+','+'\''+data.bedn+'\''+','+'\''+data.bathn+'\''+','+'\''+data.city+'\''+','+'\''+data.cityLong+'\''+','+'\''+data.cityLat+'\')'
        }else if(data.ammenityType==1){//job
            sql1 = 'INSERT INTO CityLocation VALUES ('+'\''+r+'\''+','+'\''+0.0+'\''+','+'\''+0.0+'\''+','+'\''+data.type+'\''+','+'\''+data.lat+'\''+','+'\''+data.long+'\''+','+'\''+'\''+','+'\''+'\''+','+'\''+data.link+'\')'
            //house sql
            sql2 = 'INSERT INTO Job  VALUES('+'\''+r+'\''+','+'\''+data.type+'\''+','+'\''+data.time+'\''+','+'\''+data.start+'\''+','+'\''+data.remote+'\''+','+'\''+data.description+'\''+','+'\''+data.salary+'\''+','+'\''+data.due+'\''+','+'\''+data.employer+'\''+','+'0'+','+'\''+data.city+'\''+','+'\''+data.cityLong+'\''+','+'\''+data.cityLat+'\')'
        }else if(data.ammenityType==2){//school
            sql1 = 'INSERT INTO CityLocation VALUES ('+'\''+r+'\''+','+'\''+0.0+'\''+','+'\''+0.0+'\''+','+'\''+data.type+'\''+','+'\''+data.lat+'\''+','+'\''+data.long+'\''+','+'\''+'\''+','+'\''+'\''+','+'\''+data.link+'\')'
            //house sql
            sql2 = 'INSERT INTO School  VALUES('+'\''+r+'\''+','+'\''+data.minGrade+'\''+','+'\''+data.maxGrade+'\''+','+'0'+','+'\''+data.city+'\''+','+'\''+data.cityLong+'\''+','+'\''+data.cityLat+'\')'
            
        }else if(data.ammenityType==3){//store
            sql1 = 'INSERT INTO CityLocation VALUES ('+'\''+r+'\''+','+'\''+0.0+'\''+','+'\''+0.0+'\''+','+'\''+data.type+'\''+','+'\''+data.lat+'\''+','+'\''+data.long+'\''+','+'\''+'\''+','+'\''+'\''+','+'\''+data.link+'\')'
            //house sql
            sql2 = 'INSERT INTO Store VALUES('+'\''+r+'\''+','+'\''+data.merch+'\''+','+'0'+','+'\''+data.city+'\''+','+'\''+data.cityLong+'\''+','+'\''+data.cityLat+'\')'
            
        }else if(data.ammenityType==4){//community support
            sql1 = 'INSERT INTO CityLocation VALUES ('+'\''+r+'\''+','+'\''+0.0+'\''+','+'\''+0.0+'\''+','+'\''+data.type+'\''+','+'\''+data.lat+'\''+','+'\''+data.long+'\''+','+'\''+'\''+','+'\''+'\''+','+'\''+data.link+'\')'
            //house sql
            sql2 = 'INSERT INTO CommunitySupport VALUES('+'\''+r+'\''+','+'\''+data.type+'\''+','+'\''+data.offering+'\''+','+'0'+','+'\''+data.city+'\''+','+'\''+data.cityLong+'\''+','+'\''+data.cityLat+'\')'
        }
        
         con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
            console.log('adding city location successful ')
             
        });
         
          con.query(sql2, (err,result) => {
            if (err) throw err;
            //console.log(result);
            //res.push(result);
              console.log('adding ammenity to school successful: ');
            //console.log('after adding: ', res)
             
        });
    })
    socket.on('getAllAmmenities', (data) => {
        
        var res = [];
        let sql = 'SELECT * FROM House AS h, CityLocation AS cl WHERE cl.IDNumber = h.idnumber AND  h.cname = '+'\''+data+'\'' ;
         con.query(sql, (err,result) => {
            if (err) throw err;
            //console.log(result);
            res.push(result);
            //console.log('after adding: ', res)
             
        });
         sql = 'SELECT * FROM Job AS h, CityLocation AS cl WHERE cl.IDNumber = h.idnumber AND  h.cname = '+'\''+data+'\'' ;
         con.query(sql, (err,result) => {
            if (err) throw err;
            //console.log(result);
            res.push(result);
             
        });
         sql = 'SELECT * FROM School AS h, CityLocation AS cl WHERE cl.IDNumber = h.idnumber AND  h.cname = '+'\''+data+'\'' ;
         con.query(sql, (err,result) => {
            if (err) throw err;
            //console.log(result);
            res.push(result);
             
        });
         sql = 'SELECT * FROM Store AS h, CityLocation AS cl WHERE cl.IDNumber = h.idnumber AND  h.cname = '+'\''+data+'\'' ;
         con.query(sql, (err,result) => {
            if (err) throw err;
            //console.log(result);
            res.push(result);
             
        });
         sql = 'SELECT * FROM CommunitySupport AS h, CityLocation AS cl WHERE cl.IDNumber = h.idnumber AND  h.cname = '+'\''+data+'\'' ;
         con.query(sql, (err,result) => {
            if (err) throw err;
        
            res.push(result);
             console.log("sending amenities: ",res);
            socket.emit('sendingAllAmmenities', res);
        });
//          //console.log('sending ammenities: ', res, data)
         
    })
    socket.on('getCityNumsfromCity', (data) => {
        //let strProv = provs[data];
        //let sql = 'SELECT COUNT(h.idnumber), COUNT(j.idnumber), COUNT(s.idnumber),COUNT(sc.idnumber),COUNT(c.idnumber) FROM House AS h, Job AS j, Store AS s, School AS sc,  CommunitySupport AS c HAVING h.cname=j.cname AND h.cname = s.cname AND h.cname = sc.cname AND h.cname = c.cname AND h.cname = '+'\''+data+'\''
        
        let sql = 'SELECT COUNT(*), COUNT(*), COUNT(*),COUNT(*),COUNT(*) FROM House, Job , Store , School ,  CommunitySupport HAVING cname = '+'\''+data+'\''
        
        let sql1 ='SELECT COUNT(*) FROM House AS h WHERE h.cname = '+'\''+data+'\''
        let sql2 ='SELECT COUNT(*) FROM Job AS h WHERE h.cname = '+'\''+data+'\''
        let sql3 ='SELECT COUNT(*) FROM Store AS h WHERE h.cname = '+'\''+data+'\''
        let sql4 ='SELECT COUNT(*) FROM School AS h WHERE h.cname = '+'\''+data+'\''
        let sql5 ='SELECT COUNT(*) FROM CommunitySupport AS h WHERE h.cname = '+'\''+data+'\''
        var success = 0;
        var res = []
        con.query(sql1, (err,result) => {
            if (err) throw err;
            //console.log("successful query: ",result);
            res.push(result[0]);
             
        });
        
         con.query(sql2, (err,result) => {
            if (err) throw err;
            //console.log("successful query: ",result);
            res.push(result[0]);
             
        });
        
          con.query(sql3, (err,result) => {
            if (err) throw err;
            //console.log("successful query: ",result);
            res.push(result[0]);
             
        });
           con.query(sql4, (err,result) => {
            if (err) throw err;
            //console.log("successful query: ",result);
            res.push(result[0]);
             
        });
        con.query(sql5, (err,result) => {
            if (err) throw err;
            //console.log("successful query: ",result);
            res.push(result[0]);
           // var final_result = [];
           
            
            console.log('sending back info: ',res)
            socket.emit('sendingCityNums', res)
        });
        
        //console.log("sending numbers back: ",res);
        
    } )
    socket.on('deleteAmmenity', (data) =>{
        let sql1 = '';
        let sql2 = '';
        if (data.ammenityType == 0){//house
            sql1 = 'DELETE FROM House WHERE House.idnumber = '+'\''+data.id+'\''
            
            //console.log('attempting delete in server', data)
        }else if(data.ammenityType==1){//job
            sql1 = 'DELETE FROM Job WHERE Job.idnumber = '+'\''+data.id+'\''
            //console.log('attempting delete in server', data)
        }else if(data.ammenityType==2){//school
            sql1 = 'DELETE FROM School WHERE School.idnumber = '+'\''+data.id+'\''
        }else if(data.ammenityType==3){//store
            sql1 = 'DELETE FROM Store WHERE Store.idnumber = '+'\''+data.id+'\''
            
        }else if(data.ammenityType==4){//community support
            sql1 = 'DELETE FROM CommunitySupport WHERE CommunitySupport.idnumber = '+'\''+data.id+'\''
        }
         sql2 = 'DELETE FROM CityLocation WHERE CityLocation.idnumber = ' +'\''+data.id+'\''
        
        con.query(sql1, (err,result) => {
            if (err) throw err;
            console.log("successful delete query: ",result);
            //console.log('sending back info: ',res)
            //socket.emit('sendingCityNums', res)
        });
        con.query(sql2, (err,result) => {
            if (err) throw err;
            console.log("successful city location delete: ",result);
            //console.log('sending back info: ',res)
            //socket.emit('sendingCityNums', res)
        });
    })
    socket.on('getCities', (data) =>{
        let strProv = provs[data];
        
        console.log('returning cities for: ', data);
        
        console.log(strProv)
        let sqlquery = 'SELECT * FROM City AS c WHERE c.PTname = '+'\''+strProv+'\'';
        con.query(sqlquery, (err,result) => {
            if (err) throw err;
            console.log(result);
             socket.emit('sendingCities', result);
             
        });
        
       
    })
    socket.on('signUp', (data) =>{
        let user = data.username;
        let pass = data.password;

        let sqlquery = `INSERT INTO User (Username, Password) VALUES ("${user}","${pass}")`;

        con.query(sqlquery, (err,result) => {
            if (err) throw err;
            console.log(result);
        });
    });
    socket.on('logIn', (data, res) => {
        let user = data.username;
        let pass = data.password;
        let sqlquery = `SELECT * FROM User WHERE Username="${user}" AND Password="${pass}"`;

        con.query(sqlquery, (err,result) => {
            if (err) throw err;

            if (result.length > 0){
                console.log(result);
                console.log("SUCID: ", result[0].ID);
                let sqlquery2 = `SELECT * FROM Admin WHERE ID="${result[0].ID}"`;
                let isAdmin = false;

                con.query(sqlquery2, (err2, res2) => {
                    if(err2) throw err2;
                    if (res2.length > 0){
                        socket.emit('logInSuccess',{
                            username: result[0].Username,
                            password: result[0].Password,
                            id: result[0].ID,
                            isAdmin: true
                        });
                    } else {
                        socket.emit('logInSuccess',{
                            username: result[0].Username,
                            password: result[0].Password,
                            id: result[0].ID,
                            isAdmin: false
                        });
                    }
                })
            } else {
                socket.emit('logInFail');
            }
        });
    });

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

