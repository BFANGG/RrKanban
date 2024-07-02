import React, { useState } from "react";
import axios from "axios";


const useTaskAPI = () =>{
    const  addCardTask = (newTask)=> {
        console.log("addCardTaskaddCardTask");
        axios.post("/api/tasks", newTask);
    }
    const  updateCardTask = ( updateTask,taskId)=> {
        axios.put(`/api/tasks/${taskId}`, updateTask);
    }
    /*
    const delCardLable = (labelId)=>{
        axios.put("/api/lables", newLable,cardId);
    }*/
    const delCardTask = (id) => {
        axios.delete(`/api/tasks/${id}`);
    }
    return[addCardTask,delCardTask,updateCardTask]
}
export default useTaskAPI;