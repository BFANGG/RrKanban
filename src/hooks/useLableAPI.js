import React, { useState } from "react";
import axios from "axios";


const useLabelAPI = () => {
    const addCardLabel = (labelId, cardId) => {
        axios.post("/api/add-label-card", { LabelId: labelId, CardId: cardId });
    }
    /*
    const delCardLable = (labelId)=>{
        axios.put("/api/lables", newLable,cardId);
    }*/
    const delCardLable = (labelId, cardId) => {
        axios.post("/api/del-label-card", { LabelId: labelId, CardId: cardId });

    }
    const updateBoardLable = (newLabel, labelId) => {
        axios.put(`/api/labels/${labelId}`, newLabel);
    }
    return [addCardLabel, delCardLable, updateBoardLable]
}
export default useLabelAPI;