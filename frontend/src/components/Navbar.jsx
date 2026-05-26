import "./Navbar.css";
import api from "../api/axios";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";

function Navbar(){

    const Navigate=useNavigate();
    const [menuOpen,setMenuOpen]=useState(false);

    const handleLogout=async ()=>{

        const confirmed = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmed) return;
        
        try{
            await api.post("/users/logout");

            Navigate("/login");

        }catch(err){
            console.error(err);
            
        }
    };

    return(
        <nav className="navbar"> 
            <div className="navbar-left"> 
                <h2>Sunturist</h2> 
            </div> 
            
            <div className="navbar-right">
    
                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <Link to="/tours" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/reminders" onClick={() => setMenuOpen(false)}>Reminders</Link>
                    <Link to="/accommodations" onClick={() => setMenuOpen(false)}>Accommodations</Link>
                    <Link to="/activities" onClick={() => setMenuOpen(false)}>Activities</Link>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    ☰
                </button>

            </div> 
        </nav> 
    );

}

export default Navbar;