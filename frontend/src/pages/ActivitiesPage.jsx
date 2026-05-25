import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./Accommodation.css";

function ActivitiesPage(){

    const [activities,setActivities]
        = useState([]);

    const [name,setName]=useState("");

    const [location,setLocation]=useState("");

    const [notes,setNotes]
        = useState("");

    const [defaultDays,setDefaultDays]
        = useState("");

    const [editingId,setEditingId] = useState(null);

    const handleEdit = (activity) => {

        setEditingId(activity.id);

        setName(activity.name);

        setLocation(activity.location)

        setDefaultDays(activity.defaultDays);

        setNotes(activity.notes || "");
    };

    const fetchActivities =
        async ()=>{

        try{

            const response =
                await api.get(
                    "/activities"
                );

            setActivities(
                response.data
            );

        }catch(err){

            console.error(err);
        }
    };

    const handleSave = async ()=>{

        const payload = {

            name,
            location,
            defaultDays,
            notes
        };

        try {

            if(editingId){

                await api.put(
                    `/activities/${editingId}`,
                    payload
                );

            } else {

                await api.post(
                    "/activities",
                    payload
                );
            }

            fetchActivities();

            resetForm();

        } catch(err){

            console.error(err);
        }
    };

    const resetForm = () => {

        setEditingId(null);

        setName("");

        setLocation("");

        setDefaultDays("");

        setNotes("");

    };

    const handleDelete = async (id)=>{

        try{

            await api.delete(
                `/activities/${id}`
            );

            await fetchActivities();

        }catch(err){

            console.error(err);
        }
    };

    useEffect(()=>{

        const loadActivities=async ()=>{
            fetchActivities();
        }

        loadActivities();

    },[]);

    return(

        <>
            <Navbar/>

            <div className="page-container">

                <h1>Activities</h1>

                <div className="simple-form">

                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>
                            setName(e.target.value)
                        }
                    />

                    <input
                        placeholder="Location"
                        value={location}
                        onChange={(e)=>
                            setLocation(e.target.value)
                        }
                    />

                    <textarea
                        placeholder="Notes"
                        value={notes}
                        onChange={(e)=>
                            setNotes(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="Default Days"
                        value={defaultDays}
                        onChange={(e)=>
                            setDefaultDays(
                                e.target.value
                            )
                        }
                    />

                    <button onClick={handleSave}>

                        {editingId
                            ? "Save Changes"
                            : "Create"}

                    </button>

                </div>

                <div className="list-container">

                    {activities.map((a)=>(

                        <div
                            key={a.id}
                            className="simple-card"
                        >

                            <h3>{a.name}</h3>

                            <p>
                                {a.location},
                            </p>

                            <p>
                                Default:
                                {" "}
                                {a.defaultDays}
                                {" "}
                                days
                            </p>

                            <div className="card-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(a)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(a.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </>

        
    );
}

export default ActivitiesPage;