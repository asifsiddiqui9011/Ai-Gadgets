import { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

import "./GoogleBtn.css";


function GoogleBtn() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState({
		name:"",
		email:"",
		profileImage:"",
	})

    const login =  useGoogleLogin ({
        onSuccess: (codeResponse) => setUser(codeResponse),
       onError: (error) => console.log('Login Failed:', error)
   });
   

   useEffect(
       () => {
           if (user) {
               axios
                   .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                       headers: {
                           Authorization: `Bearer ${user.access_token}`,
                           Accept: 'application/json'
                       }
                   })
                   .then((res) => {
                       setProfile({...profile,name:res.data.name,profileImage:res.data.picture,email:res.data.email})
                   })
                   .catch((err) => console.log(err));
        }
       },
       [user]
    );
    
    useEffect(() => {
        if (profile.name) {
            googlelogin();
        }
    }, [profile]);

    let googlelogin = async () =>{
            let responseData;
            await fetch('http://localhost:8080/googlelogin',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(profile),
            }).then((response)=>response.json()).then((data)=>responseData=data)
    
            if(responseData.success){
                 localStorage.setItem('auth-token',responseData.token);
                window.location.replace("/home");
                setProfile(null)
            }else{
                alert(responseData.errors );
            }
        
       }
    return (
        <div>
            <button className="google_btn" onClick={login} >
						<img src="./google.png" alt="google icon" />
                        <span >Sing up with Google</span>
			</button>
        </div>
    )
}

export default GoogleBtn;