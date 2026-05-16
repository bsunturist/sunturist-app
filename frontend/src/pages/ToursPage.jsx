import api from "../api/axios";
import { useState,useEffect } from "react";

function ToursPage(){

    const[tours,setTours]=useState([]);
    const [name, setName] = useState("");

    const fetchTours= async ()=>{

        try{
            const response=await api.get("/tours");

            setTours(response.data);
        }catch(err){
            console.error(err)
        }
    };

    const handleCreate=async (e)=>{
        e.preventDefault();

        try{

            await api.post("/tours",{
                name,
                country: "Italy",
                startDate: "2026-06-20",
                endDate: "2026-06-30",
                hotelReminderDate: "2026-05-20",
                activityReminderDate: "2026-05-25",
                status: "PLANNED",
                hotelAnnounced: false,
                activitiesAnnounced: false
            });

            await fetchTours();

        }catch(err){
            console.error(err);
        }
    }

    const handleDelete=async (id)=>{

        try{
            await api.delete(`/tours/${id}`);

            await fetchTours();
            

        }catch(err){
            console.error(err);
        }
    }


    useEffect(() => {

        const loadData = async () => {
            await fetchTours();
        };

    loadData();

    }, []);

    return (
        
        <div>
            <h1>Tours</h1>

            <form onSubmit={handleCreate}>

                <input
                    type="text"
                    placeholder="Tour name"
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <button type="submit">
                    Create Tour
                </button>

            </form>

            {tours.map((tour)=>(
                <div key={tour.id}>

                    <h3>{tour.name}</h3>

                    <p>{tour.country}</p>

                    <p>{tour.status}</p>

                    <button onClick={()=>handleDelete(tour.id)}>
                        Delete
                    </button>

                </div>
            ))}

        </div>
    );
}

export default ToursPage;