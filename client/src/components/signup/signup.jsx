import { Link } from "react-router-dom";
import "./signup.css";
import Cktmbtn  from "../buttons/cktmbtn";
import GoogleBtn from "../login/GoogleLoginBtn";
import { ImCross } from "react-icons/im";
import { useState } from "react";

function Signup() {

	const [signupData,setSignupData] = useState({
		username:"",
		password:"",
		email:"",
		profileImage:""
	})

	const signup = async () =>{
		//console.log("signup Function Executed",signupData);
		let responseData;
		await fetch('http://localhost:8080/signup',{
			method:'POST',
			headers:{
				Accept:'application/form-data',
				'Content-Type':'application/json',
			},
			body:JSON.stringify(signupData),
		}).then((response)=>response.json()).then((data)=>responseData=data)

		if(responseData.success){
			localStorage.setItem('auth-token',responseData.token);
			window.location.replace("/home");
		}else{
			alert(responseData.errors );
		}
	}
	
	const changeHandler = (e) =>{
		setSignupData({...signupData,[e.target.name]:e.target.value})
	}

	return (
			<div className="signupPage">
		<div className="signupform_container">
				<div className="signupleft">
					<img className="imgsign" src="./signupimg.png" alt="signup" />
				</div>
				<div className="signupright">
					<div id="signupicon">
                    <h2 className="from_heading">Create Account </h2>
					<Link to="/home"><ImCross className="CrossIcon"/></Link>  
					</div>
					
						<input name='username' value={signupData.username} onChange={changeHandler} type="text" className="input" placeholder="Username" />
						<input name='email' value={signupData.email} onChange={changeHandler} type="email" className="input" placeholder="Email" />
						<input name='password' value={signupData.password} onChange={changeHandler}
							type="password"
							className="input"
							placeholder="Password"
						/>
						<Cktmbtn onClick={signup} title="Signup"/>
						<p className="text">or</p>
						{/* <GoogleBtn/> */}
						<p className="text">
							Already Have Account ? <Link to="/login">Log In</Link>
						</p>
				   </div>
			    </div>
		</div>
	);
}

export default Signup;
