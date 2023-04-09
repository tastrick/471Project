import React from "react";
import "./style.css";
import { socket } from "../container/socket";

class LogIn extends React.Component {
	constructor(props) {
		super(props);
        this.socket = props.socket;
		this.state = {
			username: "",
			password: "",
			passwordVisible: false,
			signUp: false,
            main: true, // true: Log-In/Sign-Up, false: Either Fail or Success Screen
            message: "" // message-success: Sign-Up Successs Message, message-fail: Log-In Fail Message
		};
		this.flag = false;
		this.runLoginSuccess = props.loginSucess;
		this.runExitSeq = props.exitOnClick;
        this.socket.on('logInFail', this.handleLogInFail);
        this.socket.on('logInSuccess', this.handleLogInSuccess);
	}

	handleVisibleClick = (e) => {
		this.setState({ passwordVisible: false });
	};
	handleInvisibleClick = (e) => {
		this.setState({ passwordVisible: true });
	};
	toggleSignUp = () => {
		this.state.signUp
			? this.setState({ signUp: false })
			: this.setState({ signUp: true });
		this.setState({ password: "", username: "" });
	};
	handleSignUpAttempt = () => {
		console.log("USERNAME: ", this.state.username);
		console.log("PASSWORD: ", this.state.password);

		this.socket.emit("signUp", {
			username: this.state.username,
			password: this.state.password
		});

        this.setState({main: false, message: "success"});
	};
	handleLogInAttempt = () => {
        this.socket.emit("logIn", {
			username: this.state.username,
			password: this.state.password
		});
	};
    handleLogInSuccess = (data) => {
        //let user = data.Username;
        //let pass = data.Password;

        //console.log("SUCCESS!!!! USER/PASS/ADMIN", user, pass);
        console.log(data);
    };
    handleLogInFail = () => {
        this.setState({main: false, message: "fail"});
    };
	handleForgotPassword = () => {};

	render() {
		return (
			<div className="login-container">
				<div className="window-container">

                    {this.state.main ? 
                        <div>
                            <div className="logo-container">
                                {!this.state.signUp ? "Log In" : "Sign Up"}
                            </div>
                            <div className="exit-container" onClick={this.runExitSeq}></div>
                            <div className="credentials-container">
                                <div className="username-container">
                                    <div className="username-logo"></div>
                                    <input
                                        type="text"
                                        className="username"
                                        placeholder="Username"
                                        onChange={(e) => this.setState({ username: e.target.value })}
                                        value={this.state.username}
                                    ></input>
                                    <div className="placeholder"></div>
                                </div>
                                <div className="password-container">
                                    <div className="password-logo"></div>
                                    <input
                                        type={this.state.passwordVisible ? "text" : "password"}
                                        className="password"
                                        placeholder="Password"
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                        value={this.state.password}
                                    ></input>

                                    {this.state.passwordVisible ? 
                                        ( <div className="openeye" onClick={this.handleVisibleClick} ></div>
                                    ) : 
                                        ( <div className="closedeye" onClick={this.handleInvisibleClick}></div> )}
                                </div>
                                <a className="sign-up-container" href="#" onClick={this.toggleSignUp}>
                                    {!this.state.signUp ? "Sign Up" : "Log In"}
                                </a>
                                <a className="forgot-container" href="#" onClick={this.handleForgotPassword}>
                                    Forgot password ?
                                </a>
                            </div>
                            <div className="button-container">
                                <div className="enter-container">
                                    <button className="submit" onClick={!this.state.signUp ? this.handleLogInAttempt : this.handleSignUpAttempt}>
                                        {!this.state.signUp ? "LOGIN" : "REGISTER"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    : 
                        <div>
                            {this.state.message === "success" ? 
                                <div>
                                    <div className="message-exit-container" onClick={this.runExitSeq}></div>
                                    <h1 className="message-success"> Account Created Successfully!</h1>
                                    <h2 className="message-footer"> Username: {this.state.username}</h2>
                                </div>
                            : 
                                <div>
                                    <div className="message-exit-container" onClick={this.runExitSeq}></div>
                                    <h1 className="message-fail"> Login Failed!</h1>
                                    <h2 className="message-footer"> Could not verify credentials</h2>
                                </div>}
                        </div>}
                    
				</div>
			</div>
		);
	}
}

export default LogIn;