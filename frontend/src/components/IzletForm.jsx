import { useEffect, useState } from "react";

function IzletForm({
    onSubmit,
    editingIzlet,
    onClose
}) {

    const [formData, setFormData] = useState({
        name: "",
        guide: "",
        secondGuide: "",
        timeOfIzlet: "",
        numParticipants: "",
        numTransferParticipants: "",
        numVehicles: "",
        drivers: "",
        notes: ""
    });

    useEffect(() => {

        const setTheData=()=>{
            setFormData({

                name: editingIzlet.name || "",

                guide: editingIzlet.guide || "",

                secondGuide: editingIzlet.secondGuide || "",

                timeOfIzlet:
                    editingIzlet.timeOfIzlet?.slice(0,16) || "",

                numParticipants:
                    editingIzlet.numParticipants || "",

                numTransferParticipants:
                    editingIzlet.numTransferParticipants || "",

                numVehicles:
                    editingIzlet.numVehicles || "",

                drivers:
                    editingIzlet.drivers || "",

                notes:
                    editingIzlet.notes || ""

            });
        };

        if(editingIzlet){

            setTheData();
        }

    }, [editingIzlet]);

    const handleChange=(e)=>{

        setFormData(prev=>({

            ...prev,

            [e.target.name]:e.target.value

        }));
    };

    const handleSubmit=(e)=>{

        e.preventDefault();

        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">

            <div className="izlet-form-container">

                <button
                    className="close-btn"
                    onClick={onClose}
                    type="button"
                >
                    ×
                </button>

                <form
                    className="izlet-form"
                    onSubmit={handleSubmit}
                >

                    <h2>
                        {editingIzlet
                            ? "Edit Izlet"
                            : "Create Izlet"}
                    </h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="guide"
                        placeholder="Guide"
                        value={formData.guide}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="secondGuide"
                        placeholder="Second Guide"
                        value={formData.secondGuide}
                        onChange={handleChange}
                    />

                    <input
                        type="datetime-local"
                        name="timeOfIzlet"
                        value={formData.timeOfIzlet}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="numParticipants"
                        placeholder="Participants"
                        value={formData.numParticipants}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="numTransferParticipants"
                        placeholder="Transfer Participants"
                        value={formData.numTransferParticipants}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="numVehicles"
                        placeholder="Vehicles"
                        value={formData.numVehicles}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="drivers"
                        placeholder="Drivers"
                        value={formData.drivers}
                        onChange={handleChange}
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />

                    <button type="submit">

                        {editingIzlet
                            ? "Save Changes"
                            : "Create Izlet"}

                    </button>

                </form>

            </div>

        </div>
    );
}

export default IzletForm;