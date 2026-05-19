import "./Navbar.css";
import api from "../api/axios";
import {Link, useNavigate} from "react-router-dom";

function Navbar(){

    const Navigate=useNavigate();

    const handleLogout=async ()=>{
        
        try{
            await api.post("/users/logout");

            Navigate("/");

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
                <Link to="/tours">
                    Home
                </Link>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );

}

export default Navbar;