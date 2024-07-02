import React, { Component, useState } from 'react'
import "./LablesEdit.css";
import { Checkbox } from 'antd';
import { BiPencil } from 'react-icons/bi';
import { AiOutlineClose } from "react-icons/ai";
import AddLableEdit from './AddLableEdit/AddLableEdit';
import useToggle from '../../../../hooks/useToggle';
import _ from "lodash"

export default function LableEdit(props) {

  const [isAddLableEdit, setIsAddLableEdit] = useToggle(false);
  const [cardLabels, setCardLabels] = useState([...props.cardInfo.Labels]);
  const [boardLabels, setBoardLabels] = useState([...props.boardLabels]);
  const [nowLabel, setNowlabel] = useState();

  const handleChange = (e, label, index) => {
    // to find out if it's checked or not; returns true or false
    const checked = e.target.checked;
    if (checked) {
      cardLabels.splice(index, 0, label);
      console.log(label.id + " 原来不在现在在了"+label.color)
      props.addLabel(label);
    }
    else {
      const tempLabels = cardLabels.filter((item) => item.id !== label.id);
      setCardLabels(tempLabels);
      console.log(label.id + " 原来在现在不在了")

      props.removeLabel(label);
    }
    // to get the checked value
    const checkedValue = e.target.value;
  }
  const editLabel = (newlabel) => {
    const index = boardLabels.findIndex((item) => item.id === newlabel.id);

    if (index < 0) return;

    boardLabels[index] = newlabel;
    props.updateLabel(newlabel);
  }

  const setNow = (nowLabel) => {
    console.log(nowLabel);
    setNowlabel(nowLabel);
    setIsAddLableEdit();
  }
  return (
    <div className='LableEdit'>
      <div className='title'>Lables</div>
      <button className='closebtn' onClick={props.setIsLableEdit} ><AiOutlineClose className='icon' /></button>

      {boardLabels.map((label, index) => (
        <div className='colorlist'>
          <input className='checkbox' type='checkbox' onChange={(e) => handleChange(e, label, index)}
            defaultChecked={!(_.isEmpty(_.find(cardLabels, ['id', label.id]))) ? true : false} />
          <button className='colorbtn' style={{ backgroundColor: label.color, color: "#fff" }}>
            <p className='text'>{label.text}</p>
          </button>
          <button className='pencilbtn'  onClick={() => setNow(label)} ><BiPencil className='picon' /></button>
          {
            isAddLableEdit ?
              <AddLableEdit
                nowLabel={nowLabel}
                setIsAddLableEdit={setIsAddLableEdit}
                onSubmit={(newLabel)=> editLabel(newLabel)}
              />
              : null
          }
        </div>
      ))}
    </div>
  )
}
