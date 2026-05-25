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

                <p>{tour.tourTypeName}</p>

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
                <div className="tour-details">

                    {/* META SECTION */}
                    <div className="tour-details-grid">
                    
                        <div className="detail-item">
                            <span className="label">End Date</span>
                            <span>{formatDate(tour.endDate)}</span>
                        </div>

                        <div className="detail-item">
                            <span className="label">Country</span>
                            <span>{tour.country}</span>
                        </div>

                        <div className="detail-item">
                            <span className="label">Hotel</span>
                            <span className={tour.hotelAnnounced ? "badge green" : "badge red"}>
                                {tour.hotelAnnounced ? "Announced" : "Pending"}
                            </span>
                        </div>

                        <div className="detail-item">
                            <span className="label">Activities</span>
                            <span className={tour.activitiesAnnounced ? "badge green" : "badge red"}>
                                {tour.activitiesAnnounced ? "Announced" : "Pending"}
                            </span>
                        </div>

                    </div>

                    {/* NOTES */}
                    <div className="tour-section">
                        <h4>Notes</h4>
                        <p className="notes-box">
                            {tour.notes || "No notes added"}
                        </p>
                    </div>

                    {/* ACCOMMODATION */}
                    <div className="tour-section">
                        <h4>Accommodation Schedule</h4>                       
                        
                        {tour.accommodationSchedules?.length > 0 ? (
                            <div className="schedule-list">
                                {tour.accommodationSchedules.map((s) => (
                                    <div key={s.id} className="schedule-pill">
                                        🏨 {s.accommodationName}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty">No accommodations assigned</p>
                        )}
                    </div>

                    {/* ACTIVITIES */}
                    <div className="tour-section">
                        <h4>Activity Schedule</h4>

                        {tour.activitySchedules?.length > 0 ? (
                            <div className="schedule-list">
                                {tour.activitySchedules.map((s) => (
                                    <div key={s.id} className="schedule-pill">
                                        🎯 {s.activityName}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty">No activities assigned</p>
                        )}
                    </div>

                </div>
            )}

        </div>
    );

}

export default TourCard;
