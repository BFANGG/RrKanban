import React, { useState } from "react";
import axios from "axios";


const useCardAPI = () =>{
    const  updateCard = ( updateCard,id)=> {
        axios.put(`/api/cards/${id}`,updateCard);
    }
    const addCardUser = (cardId,userId)=>{
        axios.post(`/api/add-card-user`,{CardId:cardId,UserId:userId});
    }
    const delCardUser = (cardId,userId)=>{
        axios.post(`/api/del-card-user`,{CardId:cardId,UserId:userId});
    }
    return[updateCard,addCardUser,delCardUser]
}
export default useCardAPI;