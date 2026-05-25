import "./DashboardCards.css";

function DashboardCards({stats}){

    return(

        <div className="dashboard-grid">

            <div className="dashboard-card">
                <h3>Total Tours</h3>
                <p>{stats.totalTours}</p>
            </div>

            <div className="dashboard-card planned">
                <h3>Planned</h3>
                <p>{stats.plannedTours}</p>
            </div>

            <div className="dashboard-card confirmed">
                <h3>Confirmed</h3>
                <p>{stats.confirmedTours}</p>
            </div>

            <div className="dashboard-card completed">
                <h3>Completed</h3>
                <p>{stats.completedTours}</p>
            </div>

            <div className="dashboard-card canceled">
                <h3>Canceled</h3>
                <p>{stats.canceledTours}</p>
            </div>

            <div className="dashboard-card urgent">
                <h3>Urgent Reminders</h3>
                <p>{stats.urgentReminders}</p>
            </div>
        </div>
    );
}

export default DashboardCards;