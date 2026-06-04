import { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import IzletForm from "../components/IzletForm";
import api from "../api/axios";

function IzletiPage(){

    const [izleti,setIzleti]=useState([]);

    const [showForm,setShowForm]=useState(false);

    const [editingIzlet,setEditingIzlet]=useState(null);

    const fetchIzleti=async ()=>{

        try{

            const response=await api.get("/izleti");

            setIzleti(response.data);
        }catch(err){
            console.error(err);
            
        }
    };

    const handleCreate=async(data)=>{

        try{

            await api.post(
                "/izleti",
                data
            );

            fetchIzleti();

            setShowForm(false);

        }catch(err){

            console.error(err);
        }
    };

    const handleUpdate=async(data)=>{

        try{

            await api.put(
                `/izleti/${editingIzlet.id}`,
                data
            );

            fetchIzleti();

            setEditingIzlet(null);

        }catch(err){

            console.error(err);
        }
    };

    const handleDelete=async(id)=>{

        if(
            !window.confirm(
                "Delete this izlet?"
            )
        ){
            return;
        }

        try{

            await api.delete(
                `/izleti/${id}`
            );

            fetchIzleti();

        }catch(err){

            console.error(err);
        }
    };

    useEffect(()=>{
        const loadIzleti=()=>{
            fetchIzleti();
        };

        loadIzleti();
    },[]);


    return(
        <>
            <Navbar />

            {
                (showForm || editingIzlet) && (

                    <IzletForm

                        editingIzlet={editingIzlet}

                        onClose={() => {

                            setShowForm(false);

                            setEditingIzlet(null);

                        }}

                        onSubmit={
                            editingIzlet
                                ? handleUpdate
                                : handleCreate
                        }
                    />
                )
            }

            <button
                className="open-form-btn"
                onClick={() => setShowForm(true)}
            >
                + Create Izlet
            </button>

            <div className="izleti-page">

                <h1>Izleti</h1>

                <div className="izleti-list">

                    {izleti.map((izlet) => (

                        <div key={izlet.id} className="izlet-card">

                            <div className="izlet-header">

                                <h3>{izlet.name}</h3>

                                <div className="izlet-actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            setEditingIzlet(izlet)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(izlet.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                            <div className="izlet-grid">

                                <div>
                                    <span>Guide:</span>
                                    <p>{izlet.guide || "-"}</p>
                                </div>

                                <div>
                                    <span>Second Guide:</span>
                                    <p>{izlet.secondGuide || "-"}</p>
                                </div>

                                <div>
                                    <span>Date & Time:</span>
                                    <p>
                                        {izlet.timeOfIzlet
                                            ? new Date(
                                                izlet.timeOfIzlet
                                            ).toLocaleString("hr-HR")
                                            : "-"}
                                    </p>
                                </div>

                                <div>
                                    <span>Participants:</span>
                                    <p>{izlet.numParticipants}</p>
                                </div>

                                <div>
                                    <span>Transfer Participants:</span>
                                    <p>{izlet.numTransferParticipants}</p>
                                </div>

                                <div>
                                    <span>Vehicles:</span>
                                    <p>{izlet.numVehicles}</p>
                                </div>

                                <div className="full-width">
                                    <span>Drivers:</span>
                                    <p>{izlet.drivers || "-"}</p>
                                </div>

                                <div className="full-width">
                                    <span>Notes:</span>
                                    <p>{izlet.notes || "-"}</p>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </>
    );

}

export default IzletiPage;