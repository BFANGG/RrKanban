import React, { Component, useState, useEffect } from 'react'
import "./MemberEdit.css";
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import _ from "lodash"
import Avatar from '../../../Avatar/avatar';
import useToggle from '../../../../hooks/useToggle';

export default function MemberEdit(props) {
    useEffect(() => {
        axios.get(`/api/boards/${props.boardInfo.id}`)//级联查询，不用分开查了
            .then(response => {
                setBoardMembers(response.data.Users);
            })
    }, []);

    const [boardMembers,setBoardMembers]=useState([...props.boardInfo.Users]);               //项目所有成员
    const [cardMembers, setCardMembers] = useState([...props.cardInfo.Users]);
    //const cardMembers = props.cardInfo.Users;                //卡片所有成员
    const [check, setCheck] = useToggle();

    const chageState = (user, index) => {
        if (!(_.isEmpty(_.find(cardMembers, ['id', user.id])))) {
            const tempMembers = cardMembers.filter((item) => item.id !== user.id);
            setCardMembers(tempMembers);

            props.removeMember(user.id);
            console.log(user.name + "原来在现在不在了");
        }
        else {
            cardMembers.splice(index, 0, user);
            props.addMember(user);

            console.log(user.name + "原来不在现在在了");
        }

    }

    return (
        <div className='memberedit'>
            <div className='title'>Board Members</div>
            <button className='memberclosebtn' onClick={props.setIsMemberEdit} ><AiOutlineClose className='icon' /></button>
            <div className='list'>
                {boardMembers.map((v, index) => (
                    <button className='listbtn' onClick={() => chageState(v, index)}>
                        <Avatar userInfo={v} />
                        <div className='content'>
                            {v.name}
                        </div>
                        {!(_.isEmpty(_.find(cardMembers, ['id', v.id]))) ?
                            <label className='check'>
                            √
                            </label>
                            : null
                        }
                    </button>
                ))}
            </div>
        </div>
    )
}

