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

            setIzleti(response.date);
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

                {izleti.map((izlet)=>(

                    <div key={izlet.id}>

                        {izlet.name}

                        <button
                            onClick={() =>
                                setEditingIzlet(izlet)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                handleDelete(izlet.id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>
        </>
    );

}

export default IzletiPage;