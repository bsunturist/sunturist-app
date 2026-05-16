import { useState } from "react";
import api from "../api/axios";

function LoginPage(){

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin= async (e)=>{

        e.preventDefault();

        try{
            await api.post("/users/login",{
                username,
                password
            });

            alert("Login successful");
        }catch(err){
            alert("Login failed");
            console.log(err);
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