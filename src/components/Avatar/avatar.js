import React, { useState, useEffect } from "react";
import "./Avatar.css";
import ChangeAvatar from "../ChangeAvatar/ChangeAvatar"
import useToggle from "../../hooks/useToggle";
import axios from "axios";
//用户头像框
export default function Avatar(props) {
    const [isChangeAvatar, setIsChangeAvatar] = useToggle(false);
    useEffect(() => {
        axios.get("/api/users")
            .then(res => {
                if (props.setUserInfo) props.setUserInfo(res.data);
                if (props.updateMember) props.updateMember(res.data);
            })
    }, [isChangeAvatar])
    console.log(props.isNavbar + "isNavbar");
   
    const ChangeAvatar = () => {
        if (props.isNavbar) {
            ;
        }
        return
    }
    return (
        <div className="Avatar">
            <button className="avatar">
                <span className="avatar_info"
                    style={{ backgroundImage: `url(${props.userInfo.avatar})` }}>
                </span>
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
        </div>
    )
}