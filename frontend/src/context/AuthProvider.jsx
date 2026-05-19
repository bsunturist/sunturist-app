import { useEffect,useState } from "react";
import {AuthContext} from "./auth-context";
import api from "../api/axios";

export function AuthProvider({children}){

    const [user,setUser]=useState(null);

    const [loading,setLoading]=useState(true);

    const fetchUser=async ()=>{

        try{
            const response=await api.get("/users/me");

            setUser(response.data);
        }catch{
            setUser(null);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {

        const loadUser=async ()=>{
            await fetchUser();
        }
        
        loadUser();
    }, []);

    return(

        <AuthContext.Provider value={{user,setUser,fetchUser}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}