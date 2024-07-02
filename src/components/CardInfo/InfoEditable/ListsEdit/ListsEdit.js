import React, { Component } from 'react'
import "./ListsEdit.css";
import { AiOutlineClose } from "react-icons/ai";

export default function ListsEdit (props){
        return (
            <div className='ListsEdit'>
                <div className='title'>Add A List</div>
                <button className='closebtn' onClick={props.setIsListEdit} ><AiOutlineClose className='icon' /></button>
                <div className='text'>Title</div>
                <input className='inputtitle'></input>
                <button className='addbtn' onClick={props.setIsListEdit}><div className='add'>Add</div></button>
            </div>
        )
    }

