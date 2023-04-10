import React from "react";
import {socket} from "./socket";
import Map from "../interactive-map/InteractiveMap";
import LogIn from "../login/LogIn";
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
        this.mapRef = React.createRef();
        this.state = {
            showLogin:false,
            login: false,
            admin: false,
            username: ""
        }
        
        
      
    }
    componentDidMount(){
        this.socket.on('connect', () => {
            //console.log(this.socket.id)
            this.idRef.current = this.socket.id
            this.id = this.idRef.current
            //console.log(this.id)
        });
        //this.mapRef.current.setId()

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
    handleLogin = () =>{
        this.setState({showLogin:true});
    }
    handleLoginSuccess = (data) => {
        this.setState({username: data.username, login: true});
        if(data.isAdmin){
            this.setState({admin: true});
        }
        this.mapRef.current.loginSuccess(data);
    }
    handleSignOut = () => {
        this.setState({login: false, admin: false, showLogin: false});
        this.mapRef.current.logoutSuccess();
    }
    handleExitLogin = () =>{
        this.setState({showLogin:false});
    }
    
    render(){
        return (
            <div className = "container" >
                {!this.state.login ? 
                    <div className = "home-bar-container">
                        <div className = "home-container"></div>
                        <div className ={ this.state.showLogin ? "sign-in-container-clicked" : "sign-in-container"}  onClick = {this.handleLogin}>
                            <div className = "icon-container">
                                <img src= {signin}></img>
                            </div>
                            <div className = "text-container">
                                Sign-in
                            </div>
                        </div>
                    </div> 
                : 
                    <div className = "home-bar-container">
                        <div className = "home-container"></div>
                        <div className ={this.state.admin ? "admin-container" : "user-container"}  onClick = {this.handleSignOut}>
                            <div className = "signout-text-container">
                                {this.state.username}
                                <p>Sign out</p>
                            </div>
                        </div>
                    </div>}
                {this.state.showLogin ? 
                    <LogIn exitOnClick = {this.handleExitLogin} loginSucess = {this.handleLoginSuccess} socket={this.socket}></LogIn>
                :  
                    <div className = "noLogin"></div> }

                <Map socket = {this.socket} ref={this.mapRef}></Map>
            </div>
         
        )
    }
}

export default Container
