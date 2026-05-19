import "./TourCard.css";
import { useState } from "react";

function TourCard ({tour,onDelete,onEdit}){

    const [expanded,setExpaneded]=useState(false);

    const formatDate = (dateString) => {

        if (!dateString) return "-";

        const date = new Date(dateString);

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const year = String(
            date.getFullYear()
        ).slice(-2);

        return `${day}-${month}-${year} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    return(
        <div className="tour-card">

            <div className="tour-main-row table-grid">
                <p>{tour.id}</p>

                <h3>{tour.name}</h3>

                <p>
                    {formatDate(tour.startDate)}
                </p>

                <p className={`status-badge ${tour.status.toLowerCase()}`}>
                    {tour.status}
                </p>

                <p className={`${tour.hotelAnnounced}`}>
                    {formatDate(tour.hotelReminderDate)}
                </p>

                <p className={`${tour.activitiesAnnounced}`}>
                    {formatDate(tour.activityReminderDate)}
                </p>

                <button className="edit-btn" onClick={onEdit}>Edit</button>

                <button className="delete-btn"
                    onClick={() =>
                        onDelete(tour.id)
                    }
                >
                    Delete
                </button>

                <button className="details-btn" 
                    onClick={()=>setExpaneded(!expanded)}>

                        {expanded ? "hide" : "details"}
                </button>
            </div>

            <div className="tour-timestamps">
                <p>Created: {" "} {formatDate(tour.createdAt)}</p>
                <p>Updated: {" "} {formatDate(tour.updatedAt)}</p>
            </div>

            {expanded && (

                <div>
                    <p>
                        End Date: {" "} {formatDate(tour.endDate)}
                    </p>

                    <p>
                        Hotel Announced: {" "} {tour.hotelAnnounced ? "yes" : "no"}
                    </p>

                    <p>
                        Activities Announced: {" "} {tour.activitiesAnnounced ? "yes" : "no"}
                    </p>

                    <p>
                        Notes: {" "} {tour.notes || "None"}
                    </p>

                    <p>
                        Country: {" "} {tour.country}
                    </p>
                </div>
                
            )}

        </div>
    );

}

export default TourCard;
