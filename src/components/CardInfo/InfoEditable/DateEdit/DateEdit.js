import React, { Component, useState } from 'react'
import "./DateEdit.css";
import { AiOutlineClose } from "react-icons/ai";
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function DateEdit(props) {

    const [date, setDate] = useState(new Date());
    const save=()=>{
        console.log(date);
        props.updateDate(date);
        props.setIsDateEdit();
    }
    return (
        <div className='DateEdit'>
            <div className='title'>Date</div>
            <button className='closebtn' onClick={props.setIsDateEdit} ><AiOutlineClose className='icon' /></button>
            <div type='date'></div>
            <Calendar
                locale="en"
                onChange={setDate}
                value={date}
            />
            <div className='text'>Deadline</div>
            <input className='text1' defaultValue="YYYY/MM/DD" value={date.toDateString()}></input>
            <button className='savebtn' onClick={save}>save</button>
        </div>
    )
}

