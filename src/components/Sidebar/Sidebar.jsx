import React, { useState, useEffect } from "react";
import { HiHome } from "react-icons/hi";
import { AiFillStar, AiOutlineBars, AiOutlinePlus } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import './Sidebar.css';
import { BiPackage } from "react-icons/bi";
import NewBoardModal from "../NewBoardMoal/NewBoardModal";
import useToggle from "../../hooks/useToggle";


const Sidebar = (props) => {
    const [modal, toggleModal] = useToggle(false);
    const [count, setCount] = useState(0);
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    //const [boardsList, setBoardsList] = useState(props.boardsList || []);
    const [boardsList, setBoardsList] = useState([]);
    //const isDashboard = props.isDashboard;
    // console.log(props.isDashboard + "idDashboard");
    useEffect(() => {
        axios.get("/api/boards")
            .then(response => {
                setBoardsList(response.data.boardData);
            })
    }, [props.boardsList]);
    const createBoard = (boardInfo) => {
        axios.post("/api/boards", boardInfo)
            .then((response) => {
                setBoardsList([...boardsList, response.data]);
            })
    }

    return (
        <>
            <div className="container1">
                <main >
                    {props.children}
                </main>
                <div style={{ width: isOpen ? "260px" : "25px" }} className="sidebar">
                    <div className="bars">
                        <AiOutlineBars className="bar_btn" onClick={toggle} />
                    </div>
                    <div className='menu'>
                        <NavLink to="/dashboard" className="link" activeclassname="active" style={{ display: isOpen ? "flex" : "none" }}>
                            <div><HiHome className="icon" /></div>
                            <div className="link_text1">Home</div>
                        </NavLink>
                        <NavLink to="/board-settings" className="link" activeclassname="active" style={{ display: isOpen ? "block" : "none" }}>
                            <div className="settingtitle">
                                <div><IoMdSettings className="icon" /></div>
                                <div className="link_text2">Board Settings</div>
                            </div>
                        </NavLink>
                        <div className='starredmenu' style={{ display: isOpen ? "block" : "none" }}>
                            <div className='starredtitle'>
                                <div><AiFillStar className='icon' /></div>
                                <div className='link_text3'>Starred Boards</div>
                            </div>
                            <div className='starredboard'>
                                {boardsList && boardsList.map(d => (
                                    d.isStarred ?
                                        <a href={`/board/${d.id}`} className="boardLink" title={d.name}>
                                            <img src={d.bgImage} className="link_img" ></img>
                                            <label className="link_label">{" " + d.name}</label>
                                        </a>
                                        : null
                                ))}
                            </div>
                        </div>
                        <div className='allmenu' style={{ display: isOpen ? "block" : "none" }}>
                            <div className='alltitle'>
                                <div><FaClipboardList className='icon' /></div>
                                <div className='link_text4'>All Boards</div>
                            </div>
                            <div className="allboard">
                                {boardsList.map(d => (
                                    <div className="allboardlink">
                                        <a href={`/board/${d.id}`} className="boardLink" title={d.name}>
                                            <img src={d.bgImage} className="link_img"></img>
                                            <label className="link_label">{d.name}</label>
                                        </a>
                                    </div>
                                    // <a href={`/board/${d.id}`} className="boardLink" activeclassName="active" style={{ display: isOpen ? "block" : "none" }}>{d.name}</a>
                                ))}
                            </div>
                            {modal ?
                                <NewBoardModal
                                    toggleModal={toggleModal}
                                    createBoard={createBoard}
                                />
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;