import React, { Component, useState } from 'react'
import "./AddLableEdit.css";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from 'antd';

export default function AddLableEdit(props) {


  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
    "#a8193d",
    "#4fcc25"
  ];
  const [selectedColor, setSelectedColor] = useState(props.nowLabel.color || "");
  const [inputText, setInputText] = useState(props.nowLabel.text || "");

  const submission = (e) => {
    if (props.onSubmit) {
      setInputText("");
      setSelectedColor("");
      console.log("inputText:" + inputText + "selectedColor" + selectedColor)
      props.onSubmit({ text: inputText, color: selectedColor, id: props.nowLabel.id });
    }
    props.setIsAddLableEdit();
  };

  return (
    <form className='AddLableEdit' onSubmit={submission}>
      <div className='title'>Add A Lable</div>
      <button className="closebtn" onClick={props.setIsAddLableEdit}><AiOutlineClose className="closeicon" /></button>
      <div className='box1'>
        <div className='text1'>Title</div>
        <input className='inputtitle' value={inputText} onChange={(event) => setInputText(event.target.value)} autoFocus />
      </div>
      <div className='colorlist'>
        {colors.map(color => (
          <button className='color' type="button" onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }} ></button>
        ))}
      </div>
      <button type="submit" className='addbtn'><p className='add'>Add</p></button>
    </form>
  )
}
