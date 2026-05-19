import { useState } from "react";
import "./TourForm.css";

function TourForm({
    onCreate,
    onUpdate,
    onClose,
    editingTour
}) {

    const [formData,setFormData]=
        useState({
            name:
            editingTour?.name || "",

            country:
                editingTour?.country || "",

            startDate:
                editingTour?.startDate || "",

            endDate:
                editingTour?.endDate || "",

            hotelReminderDate:
                editingTour?.hotelReminderDate || "",

            activityReminderDate:
                editingTour?.activityReminderDate || "",

            status:
                editingTour?.status || "PLANNED",

            notes:
                editingTour?.notes || "",

            hotelAnnounced:
                editingTour?.hotelAnnounced || false,

            activitiesAnnounced:
                editingTour?.activitiesAnnounced || false
        });

    const handleChange=(e)=>{

        const {name,value}=e.target;

        setFormData(prev=>(
            {
                ...prev,
                [name]:value
            }
        ));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(editingTour){
            await onUpdate(editingTour.id,formData);
        }else{
            await onCreate(formData);
        }

        onClose();
    };

    return (

        <div className="modal-overlay">

            <div className="tour-form-container">

                <button
                    type="button"
                    className="close-btn"
                    onClick={onClose}
                >

                    ×

                </button>

                <form
                    className="tour-form"
                    onSubmit={handleSubmit}
                >

                    <h2>{editingTour ? "Edit Tour" : "Create Tour"}</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Tour name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                    />

                    <label>Start Date</label>

                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />

                    <label>End Date</label>

                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />

                    <label>
                        Hotel Reminder
                    </label>

                    <input
                        type="date"
                        name="hotelReminderDate"
                        value={
                            formData.hotelReminderDate
                        }
                        onChange={handleChange}
                    />

                    <label>
                        Activity Reminder
                    </label>

                    <input
                        type="date"
                        name="activityReminderDate"
                        value={
                            formData.activityReminderDate
                        }
                        onChange={handleChange}
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="PLANNED">
                            Planned
                        </option>

                        <option value="CONFIRMED">
                            Confirmed
                        </option>

                        <option value="COMPLETED">
                            Completed
                        </option>

                        <option value="CANCELED">
                            Canceled
                        </option>

                    </select>

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />

                    <div className="checkbox-group">

                        <label className="checkbox-label">

                            <input
                                type="checkbox"
                                name="hotelAnnounced"
                                checked={
                                    formData.hotelAnnounced
                                }
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        hotelAnnounced:
                                            e.target.checked
                                    }))
                                }
                            />

                            Hotel Announced

                        </label>

                        <label className="checkbox-label">

                            <input
                                type="checkbox"
                                name="activitiesAnnounced"
                                checked={
                                    formData.activitiesAnnounced
                                }
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        activitiesAnnounced:
                                            e.target.checked
                                    }))
                                }
                            />

                            Activities Announced

                        </label>

                    </div>

                    <button type="submit">

                        {editingTour ? "Save Changes" : "Create Tour"}

                    </button>

                </form>

            </div>

        </div>
    );
}

export default TourForm;