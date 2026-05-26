import api from "../api/axios";
import TourCard from "../components/TourCard";
import TourForm from "../components/TourForm";
import Navbar from "../components/Navbar";
import { useState,useEffect } from "react";
import "./ToursPage.css";
import DashboardCards from "../components/DashboardCards";

function ToursPage(){

    const [tours,setTours]=useState([]);
    const [showForm, setShowForm]=useState(false);
    const [search,setSearch]=useState("");
    const [filters,setFilters]=useState({status:"",startDate:"",country:"",announced:"",tourTypeId:""});
    const [appliedFilters,setAppliedFilters]=useState({status:"",startDate:"",country:"",announced:"",tourTypeId:""});
    const [editingTour,setEditingTour]=useState(null);
    const [stats,setStats]=useState(null);
    const [tourTypes,setTourTypes]=useState([]);

    const fetchStats=async ()=>{

        try{
            const response= await api.get("/tours/stats");
            
            setStats(response.data);
        }catch(err){
            console.error(err);
            
        }
    };

    const handleUpdate= async (id,tourData)=>{

        try{

            await api.put(
                `/tours/${id}`,tourData
            );

            await fetchTours();
            await fetchStats();

            setEditingTour(null);
        }catch(err){
            console.error(err);
            
        }
    }

    const handleFilterChange=(e)=>{
        const {name,value}=e.target;

        setFilters(prev=>(
            {
                ...prev,
                [name]:value
            }
        ));
    };

    const applyFilters=()=>{
        setAppliedFilters(filters);
    }

    const resetFilters=()=>{
        const emptyFilters={
            status:"",
            startDate:"",
            country:"",
            announced:"",
            tourTypeId:""
        };

        setFilters(emptyFilters);

        setAppliedFilters(emptyFilters);
    }

    const fetchTours= async ()=>{

        try{
            const response = await api.get("/tours");
                       
            setTours(response.data);

        }catch(err){
            console.error(err)
        }
    };

    

    const handleCreate=async (tourData)=>{

        console.log(tourData);
        

        try{
            await api.post("/tours",tourData);

            await fetchTours();
            await fetchStats();

        }catch(err) {console.error(err);}
    };

    const handleDelete=async (id)=>{

        const confirmed = window.confirm(
            "Are you sure you want to delete this tour?"
        );

        if (!confirmed) return;

        try{
            await api.delete(`/tours/${id}`);

            await fetchTours();
            await fetchStats();
            

        }catch(err){
            console.error(err);
        }
    };


    useEffect(() => {

        const fetchTourTypes= async ()=>{

                try{
                    const response= await api.get("/tour-types");

                    setTourTypes(response.data);
                }catch(err){
                    console.error(err);
                    
                }
        };

        const loadData = async () => {
            await fetchTours();
        };

        const loadStats=async ()=>{
            await fetchStats();
        }

        loadData();

        loadStats();

        fetchTourTypes();

    }, []);

    const filteredTours=tours.filter( (tour)=>{ 
        const matchesSearch= tour.name.toLowerCase() .includes(search.toLowerCase()); 
        const matchesStatus=!appliedFilters.status || tour.status===appliedFilters.status; 
        const matchesStartDate=!appliedFilters.startDate || tour.startDate>=appliedFilters.startDate; 
        const matchesCountry=!appliedFilters.country || tour.country.toLowerCase().includes(appliedFilters.country.toLowerCase()); 
        const matchesAnnounced=!appliedFilters.announced || (appliedFilters.announced==="true" 
            ? tour.hotelAnnounced && tour.activitiesAnnounced : !tour.hotelAnnounced || !tour.activitiesAnnounced ); 
        const matchesType=!appliedFilters.tourTypeId||tour.tourTypeId===Number(appliedFilters.tourTypeId);

        return ( matchesSearch && matchesStatus && matchesStartDate && matchesCountry && matchesAnnounced && matchesType ); 
    } );

    return (

        <>
            <Navbar />
            
            <div className="tours-container">

                <div className="dashboard-section">
                    {stats && <DashboardCards stats={stats}/>}
                </div>

                

                <div className="filters-container">

                    <div className="filters-left">
                        <input type="text" placeholder="Search by tour name..." value={search}
                            onChange={(e)=>setSearch(e.target.value)}/>

                        <select name="status" value={filters.status} onChange={handleFilterChange}>

                            <option value="">All statuses</option>
                            <option value="PLANNED">Planned</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELED">Canceled</option>
                        </select>

                        <select
                            name="tourTypeId"
                            value={filters.tourTypeId}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Tour Types</option>

                            {tourTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name} ({type.category})
                                </option>
                            ))}
                        </select>

                        <input type="text" name="country" placeholder="Country"
                            value={filters.country} onChange={handleFilterChange}/>

                        <input type="date" name="startDate" value={filters.startDate}
                            onChange={handleFilterChange}/>

                        <select
                            name="announced"
                            value={filters.announced}
                            onChange={handleFilterChange}
                        >

                            <option value="">
                                All Announcement States
                            </option>

                            <option value="true">
                                Fully Announced
                            </option>

                            <option value="false">
                                Needs Announcements
                            </option>

                        </select>

                        <button onClick={applyFilters}> 

                            Apply Filters

                        </button>

                        <button className="reset-btn" onClick={resetFilters}>

                            Reset

                        </button>
                    </div>

                    <div className="filter-right">
                        <button className="open-form-btn"
                            onClick={()=>setShowForm(true)}>+ Create Tour</button>
                    </div>

                    
                </div>

                
                {(showForm || editingTour) && (
                    <TourForm onCreate={handleCreate} 
                        onUpdate={handleUpdate}
                        editingTour={editingTour}
                        onClose={()=>{
                            setShowForm(false);
                            setEditingTour(null);
                        }}/>
                )}          

                <div className="tour-headers">
                    <div className="tour-headers-row table-grid">
                        <h3>ID</h3>

                        <h3>Customer Name</h3>

                        <h3>Tour Name</h3>

                        <h3>Start date</h3>

                        <h3>Status</h3>

                        <h3>Accomodation reminder date</h3>

                        <h3>Activity reminder date</h3>

                        <h3>Edit</h3>

                        <h3>Delete</h3>

                        <h3>Details</h3>
                    </div>
                        
                </div>
                
                
                {filteredTours.map((tour)=>(
                            
                    <TourCard key={tour.id} tour={tour} onDelete={handleDelete} onEdit={()=>setEditingTour(tour)}/>
                    
                )
                )}              

            </div>
        </>
        
    );
}

export default ToursPage;