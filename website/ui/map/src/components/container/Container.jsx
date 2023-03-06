import React from "react";
import {socket} from "./socket";
import Map from "../map/Map"

import './style.css'

//const socket = 

class Container extends React.Component{
    
    constructor(props){
        super(props);
        this.socket = socket
        this.idRef  = React.createRef();
        this.id = '';
        this.users = React.createRef();
        this.onlineState = false;
        this.state = {
            
        }
        //console.log('constructor socket', this.socket)
        
      // this.chatRef = React.createRef();
      
    }
    componentDidMount(){
        this.socket.on('connect', () => {
            //console.log(this.socket.id)
            this.idRef.current = this.socket.id
            this.id = this.idRef.current
            //console.log(this.id)
        });
       // this.socket.on('recieve-users',this.recieveUsers)
        //this.socket.on('r',this.handleMessageNotification);
        
        //this.socket.on('incomingCall',this.incomingCall)
       // this.socket.on('callEnded',this.endingCall)
    }
    componentWillUnmount(){
        //this.socket.removeAllListeners();
        //this.handleExit()
        this.socket.off('recieve-users',this.recieveUsers)
        //this.socket.off('recieve-id', this.handleID)
        //console.log('unmount socket: ', this.socket)
        // this.socket.off('r',this.handleMessageNotification);
         //this.socket.off('incomingCall',this.incomingCall)
        // this.socket.off('callEnded',this.endingCall)
        //this.socket.off('recieve-users',()=>this.recieveUsers())
        //this.socket.off('recieve-id', ()=>this.handleID())
        //this.socket.disconnect()
        //console.log('exiting page', this.id,this.menuRef,this.boardRef)
    }
    incomingCall =(data) =>{
       
       
   }
    recieveUsers = (data) =>{
          //if (this.id.current===null){
              //console.log('posting',this.id)
               //this.socketReady()
       //}
        //console.log(this.id)
          this.users = data
         console.log(this.users)
         // console.log("recieved users: ",this.users,this.menuRef)
          if(this.users.length>1 ){
                //console.log("from recieve Users",this.id)
                this.onlineState = true
              
           }else if(this.onlineState = true){
               this.onlineState = false;
               
        }
           
            
    }
   
    
    render(){
        return (
            
            <div className = "container" >
            <Map socket = {this.socket}></Map>
           
            </div>
         
        )
    }
}

export default Container
