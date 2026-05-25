import { useEffect,useState } from "react";
import api from "../api/axios";
import "./RemindersPage.css";
import Navbar from "../components/Navbar";

function RemindersPage(){

    const [tours, setTours]=useState([]);
    const today= new Date();

    const fetchTours= async ()=>{

        try{

            const response= await api.get("/tours");

            setTours(response.data);
        }catch(err){
            console.error(err);
            
        }
    };

    const reminderTours=tours.filter((tour)=>{

        const confirmationDate=new Date(tour.confirmationReminderDate);

        const hotelDate=new Date(tour.hotelReminderDate);

        const activityDate=new Date(tour.activityReminderDate);

        const needsConfirmation= confirmationDate <= today && tour.status==="PLANNED";

        const needsHotel=hotelDate<=today&&!tour.hotelAnnounced;

        const needsActivities=activityDate<=today&&!tour.activitiesAnnounced;

        return(needsConfirmation||needsHotel||needsActivities);

    });

    const sortedTours=[...reminderTours].sort((a,b)=>{
        const aDate=new Date(a.startDate);
        const bDate=new Date(b.startDate);

        return aDate-bDate;
    });

    const formatDate=(date)=>{
        if(!date) return "";

        return new Date(date).toLocaleDateString("hr-HR");
    }

    useEffect(()=>{

            const load=()=>{
                fetchTours();
            };

            load();

    },[]);

    return(

        <>
            <Navbar />

            <div className="reminders-page">

                <div className="reminder-table">

                    <div className="reminder-header">
                        <div>Customer</div>

                        <div>Tour Type</div>

                        <div>Start</div>

                        <div>Confirmation</div>

                        <div>Hotel</div>

                        <div>Activities</div>
                    </div>

                    {sortedTours.map((tour)=>{
                        const today=new Date();

                        const confirmationDue=new Date(tour.confirmationReminderDate)<=today&&tour.status==="PLANNED";

                        const hotelDue=new Date(tour.hotelReminderDate)<=today&&!tour.hotelAnnounced;

                        const activitiesDue=new Date(tour.activityReminderDate)<=today&&!tour.activitiesAnnounced;

                        return(
                            <div key={tour.id} className={`reminder-row ${confirmationDue||hotelDue||activitiesDue ? "urgent" : ""}`}>
                                <div>{tour.name}</div>

                                <div>{tour.tourTypeName}</div>

                                <div>{formatDate(tour.startDate)}</div>

                                <div>{confirmationDue ? "Needs confirmation" : "OK"}</div>

                                <div>{hotelDue ? "Announce hotel" : "OK"}</div>

                                <div>{activitiesDue ? "Announce activities": "OK"}</div>

                            </div>
                        )
                    })}

                </div>

            </div>
        </>
        
    );
}

export default RemindersPage;