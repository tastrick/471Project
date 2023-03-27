import React from "react";
import "./style.css";

class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           fakePassword:"",
            realPassword:"",
            password:"",
            passwordVisible: false
        }
        this.flag = false;
        this.runExitSeq = props.exitOnClick;
    }
   
     handleVisibleClick = (e) =>{
        this.setState({passwordVisible:false})
        this.setState({password:this.state.fakePassword})
    }
    handleInvisibleClick = (e) => {
        this.setState({passwordVisible:true})
        this.setState({password:this.state.realPassword})
    }
    handlePassword = (e)=>{
        if (!this.flag){
            var s = this.state.realPassword
            var s2 = this.state.fakePassword
        // console.log(e)
            var toadd = e.target.value.charAt(e.target.value.length-1)
            s+=toadd
            s2+="*"
            this.setState({realPassword:s})
            this.setState({fakePassword:s2})
            
            if (this.state.passwordVisible){
                this.setState({password:s})
            }else{
                this.setState({password:s2})
        }}
        
    }
    handleSignUp = () =>{
        
    }
    handleForgotPassword = () => {
        
    }
    handlePasswordChange = (e) =>{
        
        console.log("yep")
        if (e.keyCode == 8){
            this.flag = true
            var s = this.state.realPassword
            var s1 = this.state.fakePassword
            var s2 = this.state.password
            s = s.substring(0,s.length-1)
            s1 = s1.substring(0,s1.length-1)
            s2 = s2.substring(0,s2.length-1)
            this.setState({password:s2})
            this.setState({realPassword:s})
            this.setState({fakePassword:s1})
        }else{
            this.flag = false
        }
    }
    render(){
        return(
            <div className = "login-container">
                <div className = "window-container">
                    <div className = "logo-container">
                    MAP
                    </div>
                    <div className = "exit-container" onClick = {this.runExitSeq}></div>
                    <div className = "credentials-container">
                        <div className = "username-container">
                        <div className = "username-logo"></div>
                            <input type = "text" className = "username" placeholder = "Email" ></input>
                            <div className = "placeholder"></div>
                        </div>
                        <div className = "password-container">
                        <div className = 'password-logo'></div>
                            <input type = "text" className = "password" placeholder = "Password" onKeyDown = {this.handlePasswordChange} onChange = {this.handlePassword}   value = {this.state.password}>
                            </input>
                             {this.state.passwordVisible ? <div className = "openeye" onClick = {this.handleVisibleClick}></div> : <div className = "closedeye" onClick = {this.handleInvisibleClick}></div>}
                                
                        </div>
                        <a className = "sign-up-container" href = "" onClick = {this.handleSignUp}>Sign up</a>
                    <a className = "forgot-container" href = "" onClick = {this.handleForgotPassword}>Forgot password ?</a>
                    </div>
                    <div className = "button-container">
                    <div className = "enter-container">
                        <button className = "submit"> LOGIN</button>
                    </div>
                    {/*<div className = "or">OR</div>*/}
                  
                    </div>
            </div>
            </div>
    )
}
    
}
export default LogIn
