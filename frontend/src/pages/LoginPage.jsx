import { useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";

function LoginPage(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleLogin= async (e)=>{

        e.preventDefault();

        try{

            const params= new URLSearchParams();

            params.append("username",username);
            params.append("password",password);

            await api.post("/users/login",params,{
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                }
            });

            navigate("/tours");
        }catch(err){
            alert("Login failed");
            console.error(err);
        }
    };

    return(
        <form onSubmit={handleLogin}>

            <input type="text" placeholder="Username"
                onChange={(e)=>setUsername(e.target.value)}/>

            <input type="password" placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}/>
            
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginPage;