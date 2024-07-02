import { Link } from "react-router-dom";
import Cktmbtn from "../buttons/cktmbtn";
import "./login.css";
import GoogleBtn from "./GoogleLoginBtn";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

function LoginPage() {

	const [loginData,setLoginData] = useState({
		username:"",
		password:"",
		email:"",
		profileImage:""
	})

	const loginn = async () =>{
		console.log("Login Function Executed",loginData)
		let responseData;
		await fetch('http://localhost:8080/login',{
			method:'POST',
			headers:{
				Accept:'application/form-data',
				'Content-Type':'application/json',
			},
			body:JSON.stringify(loginData),
		}).then((response)=>response.json()).then((data)=>responseData=data)

		if(responseData.success){
			localStorage.setItem('auth-token',responseData.token);
			window.location.replace("/home");
		}else{
			alert(responseData.errors );
		}
	}


	const loginchangeHandler = (e) =>{
		setLoginData({...loginData,[e.target.name]:e.target.value})
	}
	
	return (
		<div className="signupPage">
			
			<div className="form_container">
				<div className="left">
					<img className="loginimg" src="./loginimg.png" />
				</div>
				<div className="Right">
					<div className="Crossbtn">
						<Link to="/home"><ImCross className="CrossIcon"/></Link>
					</div>
					<div className="right">
						<h2 className="from_heading">Members Log in</h2>
				
							<input name='email' value={loginData.email} onChange={loginchangeHandler} type="email" className="input" placeholder="Email" />
							<input name='password' value={loginData.password} onChange={loginchangeHandler} type="password" className="input" placeholder="Password"  />
							<Cktmbtn onClick={loginn} title="Login" />
							<p className="text">or</p>
							<GoogleOAuthProvider clientId="930966048669-nll664mhi690t8mqsbnp69q18ubvkk11.apps.googleusercontent.com">
							<GoogleBtn/>
                            </GoogleOAuthProvider>
						<p className="text">
						New Here ? <Link to="/signup">SignUp</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
