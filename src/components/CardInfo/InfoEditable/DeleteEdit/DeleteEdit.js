import React, { Component } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import "./DeleteEdit.css";

export default function DeleteEdit(props) {
    const handleDelete = () => {
        props.deleteCard(props.cardId)
    } 
    return (
        <div className='DeleteEdit'>
            <div className='title'>Delete Confirmation</div>
            <button className='closebtn' onClick={props.setIsDeleteEdit} ><AiOutlineClose className='icon' /></button>
            <div className="text">All actions on this card are removed from recent activities and the card cannot be reopened. This operation cannot be undone.</div>
            <button className='confirmbtn' onClick={handleDelete}>Delete</button>
        </div>
    )
}