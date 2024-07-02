import React from "react";
import useToggle from "../../hooks/useToggle";
import useInputState from "../../hooks/useInputState";
import { Link } from "react-router-dom";
import  "./BoardEdit.css";
import dateFormat from "dateformat";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi';

export default function BoardEdit(props) {
    const [isEditingBoard, toggleEditForm] = useToggle(false);
    const { id, name, description, isStarred, bgImage, updatedAt } = props.boardInfo;
    const [boardName, updateBoardName] = useInputState(name);
    const [boardDesc, updateBoardDesc] = useInputState(description);
    const [isModal, toggleModal] = useToggle(false);

    const handleUpdate = (e) => {
        e.preventDefault();

        props.updateBoard(id, { name: boardName, description: boardDesc });
        toggleEditForm();
    }


    return (
        <>
        {isEditingBoard ? 
            <form onSubmit={handleUpdate} className="boardEditForm" style={{backgroundImage: `url(${bgImage})`}}>
                <div>
                    <label>Board Name:</label>
                    <input className="boardEditText" value={boardName} onChange={updateBoardName} />
                </div>
                <div>
                    <label>Board Description:</label>
                    <textarea className="boardEditText" value={boardDesc} onChange={updateBoardDesc}></textarea>
                </div>
                <button>Update</button>
                <button onClick={toggleEditForm}>Cancel</button>
            </form>
        :
            <section key={id} className={"boardSettingsCard"} style={{backgroundImage: `url(${bgImage})`}}>
                <div className="boardSettingsTitle">
                    { isStarred ? <button style={{ color: "gold" }}><AiFillStar /></button> : <button><AiOutlineStar /></button> }
                    <h2 ><Link to={`/board/${id}`}>{name}</Link></h2>
                </div>
                <div className="boardSettingsBtns">
                    <button onClick={toggleEditForm}><BiPencil className="icon" /></button>
                    <button onClick={toggleModal}><BiTrash className="icon" /></button>
                </div>
                <div className="boardSettingsInfo">
                    <p className="text1">Description:{description}</p>
                    <p className="text2">Created on {dateFormat(updatedAt, "fullDate")}</p>
                </div>
            </section>
        }

        {isModal
            ?
                <div className="deleteBoardModal">
                    <h>Delete Board?</h>
                    <hr />
                    <p>Are you sure you want to delete the project "{name}"?</p>
                    <div>
                        <button onClick={() => props.deleteBoard(id)} className={"deleteBtn"}>Delete</button>
                        <button onClick={toggleModal} className={"cancelBtn"}>Cancel</button>
                    </div>
                </div>
            :
                null
        }
            
        </>
    );
}