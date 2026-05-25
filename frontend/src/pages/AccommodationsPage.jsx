import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./Accommodation.css";

function AccommodationsPage(){

    const [accommodations,setAccommodations]
        = useState([]);

    const [name,setName]=useState("");

    const [city,setCity]=useState("");

    const [country,setCountry]
        = useState("");

    const [defaultDays,setDefaultDays]
        = useState("");
    
    const [notes,setNotes]=useState("");

    const [capacity,setCapacity]=useState("");

    const [editingId,setEditingId] = useState(null);

    const handleEdit = (a) => {

        setEditingId(a.id);

        setName(a.name);

        setCity(a.city);

        setCountry(a.country);

        setDefaultDays(a.defaultDays);

        setNotes(a.notes || "");

        setCapacity(a.capacity || "");
    };

    const fetchAccommodations =
        async ()=>{

        try{

            const response =
                await api.get(
                    "/accommodations"
                );
            
            setAccommodations(
                response.data
            );

        }catch(err){

            console.error(err);
        }
    };

    const handleSave= async ()=>{

        const payload = {

            name,
            city,
            country,
            defaultDays,
            notes,
            capacity
        };

        try {

            if(editingId){

                await api.put(
                    `/accommodations/${editingId}`,
                    payload
                );

            } else {

                await api.post(
                    "/accommodations",
                    payload
                );
            }

            fetchAccommodations();

            resetForm();

        } catch(err){

            console.error(err);
        }
    };

    const resetForm = () => {

        setEditingId(null);

        setName("");

        setCity("");

        setCountry("");

        setDefaultDays("");

        setNotes("");

        setCapacity("");
    };

    const handleDelete = async (id)=>{

        try{

            await api.delete(
                `/accommodations/${id}`
            );

            await fetchAccommodations();

        }catch(err){

            console.error(err);
        }
    };

    useEffect(()=>{

        const loadAccommodations=async ()=>{
            fetchAccommodations();
        };

        loadAccommodations();

    },[]);

    return(

        <>
            <Navbar />

            <div className="page-container">

                <h1>Accommodations</h1>

                <div className="simple-form">

                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>
                            setName(e.target.value)
                        }
                    />

                    <input
                        placeholder="City"
                        value={city}
                        onChange={(e)=>
                            setCity(e.target.value)
                        }
                    />

                    <input
                        placeholder="Country"
                        value={country}
                        onChange={(e)=>
                            setCountry(e.target.value)
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

                    <textarea
                        placeholder="Notes"
                        value={notes}
                        onChange={(e)=>
                            setNotes(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="Capacity"
                        value={capacity}
                        onChange={(e)=>
                            setCapacity(
                                e.target.value
                            )
                        }
                    />

                    <button
                        onClick={handleSave}
                    >
                        {editingId
                            ? "Save Changes"
                            : "Create"}
                    </button>

                </div>

                <div className="list-container">

                    {accommodations.map((a)=>(

                        <div
                            key={a.id}
                            className="simple-card"
                        >

                            <h3>{a.name}</h3>

                            <p>
                                {a.city},
                                {" "}
                                {a.country}
                            </p>

                            <p>
                                Default:
                                {" "}
                                {a.defaultDays}
                                {" "}
                                days
                            </p>

                            <p>
                                Capacity:
                                {a.capacity}
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

export default AccommodationsPage;