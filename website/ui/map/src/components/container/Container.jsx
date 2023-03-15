import React from "react";
import {socket} from "./socket";
import Map from "../interactive-map/InteractiveMap"

import './style.css'
import signin from "../icons2/misc/account.png";
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

      
    }
    componentDidMount(){
        this.socket.on('connect', () => {
            //console.log(this.socket.id)
            this.idRef.current = this.socket.id
            this.id = this.idRef.current
            //console.log(this.id)
        });

    }
    componentWillUnmount(){

        this.socket.off('recieve-users',this.recieveUsers)
    
    }
    incomingCall =(data) =>{
       
       
   }
    recieveUsers = (data) =>{
        
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
                 <div className = "home-bar-container">
                    <div className = "home-container">
                    </div>
                    <div className = "sign-in-container">
                    <div className = "icon-container">
                    <img src= {signin}></img>
                    </div>
                    <div className = "text-container">
                    Sign-in
                    </div>
                    </div>
                </div>
                <Map socket = {this.socket}></Map>
           
            </div>
         
        )
    }
}

export default Container
