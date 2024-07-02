import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsKanban } from 'react-icons/bs';
import { BiLogIn } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import axios from "axios";
import "./Navbar.css"
import Avatar from "../Avatar/avatar";
import useToggle from "../../hooks/useToggle";
import ChangeAvatar from "../ChangeAvatar/ChangeAvatar";

export default function Navbar(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChangeAvatar, setIsChangeAvatar] = useToggle(false);
    const [finishUpload, setFinishUpload] = useState(false);
    const [userInfo, setUserInfo] = useState(" ");
    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
                axios.get("/api/users")
                    .then(response => {
                        setUserInfo(response.data);
                        if (props.updateMember)
                            props.updateMember(response.data);
                    })
        }
        else setIsLoggedIn(false);
    },[isChangeAvatar]);

    const handleLogout = async () => {
        await axios.get("/api/logout");
        setIsLoggedIn(false);
        sessionStorage.clear();
        window.location.replace("/");
    }


    if (isLoggedIn) {
        return (
            <nav className="navbar">
                <NavLink className="navLink brandName" exact to="/" > < BsKanban /> <span >Rrkanban</span></NavLink>
                <ul>
                    <li className="link1">
                        <NavLink exact to="/dashboard" className="navLink" ><RiDashboardLine /> MyProjects</NavLink>
                    </li>
                    <li className="link2">
                        <button type="button" className="logoutBtn" onClick={handleLogout}><FaSignOutAlt /> Log Out</button>
                    </li>
                </ul>
                <button className="avatarbtn" onClick={setIsChangeAvatar} data-toggle="tooltip" data-placement="bottom" title="Click to change your avatar.">
                    <Avatar userInfo={userInfo} />
                </button>
                {
                    isChangeAvatar
                        ?
                        <ChangeAvatar
                            setIsChangeAvatar={setIsChangeAvatar}
                        />
                        :
                        null
                }
            </nav>
        );
    }
    else {
        return (
            <nav className="navbar">
                <NavLink className="navLink brandName" exact to="/" ><BsKanban /> <span >Rrkanban</span></NavLink>
                <ul>
                    <li className="link11">
                        <NavLink exact to="/login" className="navLink"><BiLogIn /> Log In</NavLink>
                    </li>
                    <li className="link21">
                        <NavLink exact to="/signup" className="navLink"><IoPersonAddOutline /> Sign Up</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
};