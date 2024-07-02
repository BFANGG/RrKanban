import React from "react";
import "./CardEdit.css";
import { BsCardList,BsArchiveFill } from "react-icons/bs";
import { AiOutlineTag, AiFillFile } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import {IoIosTime} from "react-icons/io";
import { MdInsertPhoto } from "react-icons/md";
import useCardAPI from "../../hooks/useCardAPI"
import useLabelAPI from "../../hooks/useLableAPI"
import useInputState from "../../hooks/useInputState";


// 快速编辑卡片信息的弹窗
export default function CardEdit(props) {
    const[updateCard] = useCardAPI();
    const [newCradTitle, updateCardTitle, resetCardTitle] = useInputState("");
    const handleDelete = () => {
        props.deleteCard(props.cardId)
    } 
    const handleUpdateTitle =(e)=>{
        e.preventDefault();
        
        resetCardTitle();
        props.cardEditToggle();
        props.setCardInfo({ ...props.cardInfo, cardTitle: newCradTitle });//把卡片上的值更新
        updateCard({cardTitle:newCradTitle},props.cardId);//在数据库中更新
    }
    const openInfo =()=>{
        props.cardInfoToggle();
        props.cardEditToggle();
    }
    return (
        <>
            <div className="cover"></div>
                <div className="cardedit">
                    <form className="text" onSubmit={handleUpdateTitle}>
                        <textarea className="planning" placeholder="Project planning" cols={27} rows={6}  value={newCradTitle}
                                                onChange={updateCardTitle} ></textarea>
                        <button className="save" type="submit">save</button>
                        <button className="cancelbtn" onClick={props.cardEditToggle}>cancel</button>
                    </form>
                    <div className="btnlist">
                        <button className="btn" onClick={openInfo} ><BsCardList className="icon" />card</button>
                        <button className="btn" onClick={handleDelete}><BsArchiveFill className="icon"/>delete</button>
                        {/* <button className="filebtn"><AiFillFile /></button> */}

                    </div>
                </div>
            {/* <label>CardEdit</label>
        <button className="cardCancelBtn" onClick={props.cardEditToggle}>确认</button> */}
        </>
    )
}