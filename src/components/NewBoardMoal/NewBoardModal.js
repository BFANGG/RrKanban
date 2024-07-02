import React, { useState, useEffect } from "react";
import useToggle from "../../hooks/useToggle";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { ImCross } from "react-icons/im"
import { AiOutlineClose } from "react-icons/ai";
import "./NewBoardModal.css";
import MoreImageModel from "../MoreImageMoal/MoreImageMoal"

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';


export default function NewBoardModal({ toggleModal, createBoard }) {

    const [boardName, updateName, resetBoardName] = useInputState("");
    const [boardDesc, updateDesc, resetBoardDesc] = useInputState("");
    const [isStarred, toggleStarred] = useToggle(false);
    const [boardBg, setBoardBg] = useState("");
    const [bgImagesList, setBgImagesList] = useState([]);
    const [moreImageToggle, setMoreImageToggle] = useToggle(false);

    useEffect(() => {
        axios.get("/api/unsplash")
            .then((res) => {
                console.log(res.data.results)
                const images = res.data.results.map(result => {
                    return { urlImgMedium: result.urls.regular, urlImgFull: result.urls.full };
                });
                console.log(images)
                setBgImagesList(images);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        createBoard({ name: boardName, description: boardDesc, bgImage: boardBg, isStarred: isStarred });
        resetBoardName();
        resetBoardDesc();
        toggleModal();
    }

    // Add outline over selected background image - Set state to be image URL
    const handleBoardSelect = (bgImage, evt) => {
        const backgrounds = document.querySelector("#bg-select");
        for (let i = 0; i < backgrounds.children.length; i++) {
            backgrounds.children[i].children[0].style.outline = "none";
        }
        setBoardBg(bgImage);
        evt.target.style.outline = "2px solid #026AA7";
    }

    return (
        <div className="newBoardModal">
            <div className="modelheading">
                <h3>Create New Board</h3>
                <button aria-label="Close" onClick={toggleModal}><AiOutlineClose className="icon" /></button>
            </div>
            <hr />
            <form onSubmit={handleSubmit} >
                <div className="textInputs">
                    <label htmlFor="boardName" className="text">Board Name:</label>
                    <input type="text" id="boardName" value={boardName} onChange={updateName} required />
                </div>
                <div className="textInputs">
                    <label htmlFor="boardDesc" className="text">Description:</label>
                    <input type="text" id="boardDesc" value={boardDesc} onChange={updateDesc} required />
                </div>
                <div className="backgroundSelect">
                    <label htmlFor="bg-select" className="text">Choose a background:</label>
                    <ul id="bg-select" name="bg-image" className="backgroundBtns" >
                        {
                            bgImagesList.map(img => (
                                <li key={img.urlImgMedium} value="">
                                    <button id="bf-select-btn" onClick={(e) => handleBoardSelect(`${img.urlImgFull}`, e)} type="button"
                                        style={{ backgroundImage: `url(${img.urlImgMedium})` }}></button>
                                </li>
                            ))
                        }
                    </ul>
                    <button id="bf-select-btn" className="more_btn" onClick={setMoreImageToggle} type="button">更多</button>
                    {
                        moreImageToggle ? <MoreImageModel setMoreImageToggle={setMoreImageToggle} setBoardBg={setBoardBg}/> : null
                    }
                </div>
                <div id="checkbox" className="starredbox">
                    <input className="checkbox" type="checkbox" id="starred" name="starred" value="starred" onChange={toggleStarred} />
                    <label className="text" htmlFor="starred">Starred Project</label>
                </div>
                <button className="createbtn">Create</button>
            </form>
        </div>
    );
}