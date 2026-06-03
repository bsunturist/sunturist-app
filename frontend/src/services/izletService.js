import api from "../api/axios";

export const getIzleti=()=>api.get("/izleti");

export const createIzlet=(data)=>api.post("/izleti",data);

export const updateIzlet=(id,data)=>api.put(`/izleti/${id}`,data);

export const deleteIzlet=(id)=>api.delete(`/izleti/${id}`);