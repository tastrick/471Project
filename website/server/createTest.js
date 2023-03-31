//var express = require('express');
const mysql = require('mysql2');
//const app = express();


const con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '1012',
    database: 'CanadianAmmenities'
});

let commands = ['CREATE TABLE User (ID varchar(255),Username varchar(255) NOT NULL,Password varchar(255) NOT NULL, PRIMARY KEY (ID))',

'CREATE TABLE Admin (ID varchar(255), PRIMARY KEY (ID), FOREIGN KEY (ID) REFERENCES User(ID))',

'CREATE TABLE GeneralLocation (Name varchar(255), Longitude float, Latitude float, Population int, AccessabilityRating int, PRIMARY KEY (Name, Longitude, Latitude))',


'CREATE TABLE ProvinceTerritory (Name varchar(255), Longitude float, Latitude float, HealthCareInfo varchar(255), CostRating int, PRIMARY KEY (Name, Longitude, Latitude), FOREIGN KEY (Name ,Longitude, Latitude) REFERENCES GeneralLocation(Name, Longitude, Latitude))',

'CREATE TABLE City (Name varchar(255), Longitude float, Latitude float, HealthCareInfo varchar(255), CostRating int,PTName varchar(255), PTLongitude float, PTLatitude float, PRIMARY KEY (Name, Longitude, Latitude), FOREIGN KEY (Name, Longitude, Latitude) REFERENCES GeneralLocation(Name, Longitude, Latitude), FOREIGN KEY (PTName, PTLongitude, PTLatitude) REFERENCES ProvinceTerritory(Name, Longitude, Latitude))',


'CREATE TABLE CityLocation (IDNumber varchar(255), ClosestBusStop float, ClosestTrainStop float, Name varchar(255), Latitude float NOT NULL, Longitude float NOT NULL, Street varchar(255),Number varchar(255),Link varchar(255) ,PRIMARY KEY (IDNumber))',


'CREATE TABLE House (IDNumber varchar(255), SquareFootage int, AmenitiesOffered varchar(255), HouseType varchar(255), NBedroom int, NBathroom int, CName varchar(255) NOT NULL, CLongitude float NOT NULL, CLatitude float NOT NULL,PRIMARY KEY (IDNumber), FOREIGN KEY (IDNumber) REFERENCES CityLocation (IDNumber), FOREIGN KEY (CName,CLongitude, CLatitude) REFERENCES City (Name,Longitude,Latitude))',

'CREATE TABLE Utility (UtilityID int, PRIMARY KEY (UtilityID))',

'CREATE TABLE Store(IDNumber varchar(255), Type varchar(255),UtilityID int NOT NULL, CName varchar(255) NOT NULL, CLongitude float NOT NULL, CLatitude float NOT NULL,PRIMARY KEY (IDNumber), FOREIGN KEY (IDNumber) REFERENCES CityLocation (IDNumber), FOREIGN KEY (CName, CLongitude, CLatitude) REFERENCES City (Name, Longitude, Latitude),  FOREIGN KEY (UtilityID) REFERENCES Utility (UtilityID))',

'CREATE TABLE School (IDNumber varchar(255), MinimumGrade varchar(255), MaximumGrade varchar(255),UtilityID int, CName varchar(255) NOT NULL, CLongitude float NOT NULL, CLatitude float NOT NULL,PRIMARY KEY (IDNumber), FOREIGN KEY (IDNumber) REFERENCES CityLocation (IDNumber), FOREIGN KEY (CName,CLongitude, CLatitude) REFERENCES City (Name,Longitude,Latitude), FOREIGN KEY (UtilityID) REFERENCES Utility (UtilityID))',


'CREATE TABLE Job (IDNumber varchar(255), Industry  varchar(255), Hours varchar(255) , PostingDate varchar(255), RemoteInPerson int,JobDescription varchar(255), Salary varchar(255), ApplicationDeadline varchar(255),Employer varchar(255) ,UtilityID int, CName varchar(255) NOT NULL, CLongitude float NOT NULL, CLatitude float NOT NULL,PRIMARY KEY (IDNumber), FOREIGN KEY (IDNumber) REFERENCES CityLocation (IDNumber), FOREIGN KEY (CName, CLongitude,CLatitude) REFERENCES City (Name, Longitude, Latitude), FOREIGN KEY (UtilityID) REFERENCES Utility (UtilityID))',


'CREATE TABLE CommunitySupport (IDNumber varchar(255), Organizers varchar(255), Offering varchar(255) ,UtilityID int, CName varchar(255) NOT NULL, CLongitude float NOT NULL, CLatitude float NOT NULL,PRIMARY KEY (IDNumber), FOREIGN KEY (IDNumber) REFERENCES CityLocation (IDNumber), FOREIGN KEY (CName, CLongitude, CLatitude) REFERENCES City (Name, Longitude, Latitude),  FOREIGN KEY (UtilityID) REFERENCES Utility (UtilityID))',

'CREATE TABLE CloseTo (UtilityID int, HouseIDNumber varchar(255),distance float ,PRIMARY KEY (UtilityID, HouseIDNumber), FOREIGN KEY (UtilityID) REFERENCES Utility (UtilityID), FOREIGN KEY (HouseIDNumber) REFERENCES House (IDNumber))',


'CREATE TABLE CreatesDeletesGL (ID varchar(255), Name varchar(255) NOT NULL, Longitude float NOT NULL, Latitude float NOT NULL ,PRIMARY KEY (ID), FOREIGN KEY (ID) REFERENCES User (ID), FOREIGN KEY (Name, Longitude, Latitude) REFERENCES GeneralLocation (Name, Longitude, Latitude))',

'CREATE TABLE TransportationPath (TransportationNumber int, Name varchar(255) , Longitude float, Latitude float , PRIMARY KEY (Name, Longitude, Latitude, TransportationNumber), FOREIGN KEY (Name, Longitude, Latitude) REFERENCES City (Name, Longitude, Latitude))',

'CREATE TABLE CreatesDeletesCL (ID varchar(255), IDNumber varchar(255) ,PRIMARY KEY (ID), FOREIGN KEY (ID) REFERENCES User (ID), FOREIGN KEY (IDNumber) REFERENCES CityLocation (IDNumber))',

'CREATE TABLE FavoritesGL (ID varchar(255), Name varchar(255) NOT NULL, Longitude float NOT NULL, Latitude float NOT NULL,PRIMARY KEY (ID), FOREIGN KEY (ID) REFERENCES User (ID), FOREIGN KEY (Name, Longitude,Latitude) REFERENCES GeneralLocation (Name, Longitude, Latitude))',

'CREATE TABLE FavoritesCL (ID varchar(255), IDNumber varchar(255) ,PRIMARY KEY (ID), FOREIGN KEY (ID) REFERENCES User (ID), FOREIGN KEY (IDNumber) REFERENCES CityLocation (IDNumber))',

'CREATE TABLE Route (TransportationNumber int, Name varchar(255), Longitude float, Latitude float,PRIMARY KEY (TransportationNumber, Name, Longitude,Latitude), FOREIGN KEY (Name, Longitude, Latitude, TransportationNumber) REFERENCES TransportationPath ( Name, Longitude, Latitude, TransportationNumber))'];

con.connect((err) => {
    if (err){
      throw err;
    }
    console.log("connected to database");
});

//let sql = 'CREATE DATABASE CanadianAmmenities';
//con.query(sql, (err,result) => {
//    if (err) throw err;
//    console.log('database created...');
//});


//for (var i = 0; i < commands.length; i++){
//    let sqlcommand = commands[i];
//    con.query(sqlcommand, (err,result) => {
//        if (err) throw err;
 //       console.log('creating table',i);
 //   });
//}

//let c = 'CREATE TABLE Bounds(Name varchar(255), longmin float, longmax float, latmin float, latmax float, xoffset int, yoffset int, PRIMARY KEY(Name), FOREIGN KEY (Name)  REFERENCES ProvinceTerritory(Name))'

//let c = 'INSERT INTO Utility (UtilityID) VALUES (0)'
//let c = 'DELETE FROM city WHERE city.name = \'Moose Jaw \''

//let c = ''
let c = 'INSERT INTO city(Name, Longitude, Latitude, HealthCareInfo , CostRating,PTName, PTLongitude,PTLatitude) VALUES (\'Moose Jaw\', -105.551941, 50.393333, null, null, \'Saskatchewan\', -106,55)'
con.query(c, (err,result) => {
        if (err) throw err;
        console.log('creating table bounding',result);
});

//let sql2 = 'CREATE TABLE CITIES (Name varchar(255), Latitude float, Longitude float)'

//con.query(sql2, (err,result) => {
//    if (err) throw err;
//    console.log('cities created .....');
//});
con.end()
