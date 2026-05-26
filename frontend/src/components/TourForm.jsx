import { useState,useEffect } from "react";
import "./TourForm.css";
import api from "../api/axios";
import ScheduleEditor from "./schedule/ScheduleEditor";

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

            tourTypeId:
                editingTour?.tourTypeId || "",

            status:
                editingTour?.status || "PLANNED",

            notes:
                editingTour?.notes || "",

            hotelAnnounced:
                editingTour?.hotelAnnounced || false,

            activitiesAnnounced:
                editingTour?.activitiesAnnounced || false
        });

    const [tourTypes,setTourTypes]=useState([]);

    const [accommodationSchedule,setAccommodationSchedule]=useState(editingTour?.accommodationSchedules||[]);

    const [activitySchedule,setActivitySchedule]=useState(editingTour?.activitySchedules||[]);

    const [accommodations,setAccommodations]=useState([]);

    const [activities,setActivities]=useState([]);

    useEffect(()=>{
        
        const fetchTourTypes= async ()=>{

                try{
                    const response= await api.get("/tour-types");

                    setTourTypes(response.data);
                }catch(err){
                    console.error(err);
                    
                }
        };

        const load = async ()=>{

            const a =
                await api.get(
                    "/accommodations"
                );

            const act =
                await api.get(
                    "/activities"
                );  

            setAccommodations(a.data);

            setActivities(act.data);
        };

        fetchTourTypes();

        load();

        
    },[]); 

    

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
                     
            const payload = {

                ...formData,

                tourTypeId:
                    Number(formData.tourTypeId),
            
                
                accommodationSchedules:
                accommodationSchedule.map(
                    (item,index) => ({
                        id: item.id,
                        accommodationId: item.accommodationId,
                        dayOrder: index
                    })
                ),

                activitySchedules:
                activitySchedule.map(
                    (item,index) => ({
                        id:item.id,
                        activityId: item.activityId,
                        dayOrder: index
                    })
                )

            };

            await onUpdate(editingTour.id,payload);
        }else{
            const payload = {

                ...formData,

                tourTypeId:
                    Number(formData.tourTypeId),

                accommodationSchedules:
                accommodationSchedule.map(
                    (item,index) => ({
                        id:item.id,
                        accommodationId: item.accommodationId,
                        dayOrder: index
                    })
                ),

                activitySchedules:
                activitySchedule.map(
                    (item,index) => ({
                        id:item.id,
                        activityId: item.activityId,
                        dayOrder: index
                    })
                )
            };
            
            await onCreate(payload);
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
                        placeholder="Customer name"
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

                    <select
                        name="tourTypeId"
                        value={formData.tourTypeId}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Tour Type
                        </option>

                        {tourTypes.map((type) => (

                            <option
                                key={type.id}
                                value={type.id}
                            >

                                {type.name}
                                {" "}
                                (
                                {type.category}
                                )

                            </option>
                        ))}

                    </select>

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

                    <h3>
                        Accommodation Schedule
                    </h3>

                    <ScheduleEditor
                        type="accommodation"
                        availableItems={accommodations}
                        scheduledItems={
                            accommodationSchedule
                        }
                        setScheduledItems={
                            setAccommodationSchedule
                        }
                    />

                    <h3>
                        Activity Schedule
                    </h3>

                    <ScheduleEditor
                        type="activity"
                        availableItems={activities}
                        scheduledItems={
                            activitySchedule
                        }
                        setScheduledItems={
                            setActivitySchedule
                        }
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