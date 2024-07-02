import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import useToggle from "../hooks/useToggle";
import List from "../components/List/List";
import axios from "axios";
import "./Board.css";
import { AiFillStar, AiOutlineStar, AiOutlineUserAdd } from 'react-icons/ai';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Sidebar from "../components/Sidebar/Sidebar"
import Avatar from "../components/Avatar/avatar";
import Editable from "../components/Editabled/Editable";
import CardInfo from "../components/CardInfo/CardInfo";

export default function Board() {
    const { id: boardId } = useParams();
    const [listArray, setListArray] = useState([]);
    const [memberArray, setMemberArray] = useState([]);
    const [boardInfo, setBoardInfo] = useState("");
    const [newListTitle, updateListTitle, resetListTitle] = useInputState("");
    const [isStarred, toggleStarStatus] = useToggle(false);
    const [addListBtn, toggleAddListBtn] = useToggle(false)
    const [refreshBoard, setRefreshBoard] = useToggle(false);
    

    useEffect(() => {
        //可以调接口
        //可以存state，如setCount(count + 1)
        //可以调其他函数
        axios.get(`/api/boards/${boardId}`)//级联查询，不用分开查了
            .then(response => {
                setBoardInfo(response.data);
                setMemberArray(response.data.Users);
                if (response.data.isStarred) toggleStarStatus();
                else return;
            })       
        axios.get(`/api/lists/${boardId}`)  //获取看板所有列
            .then(response => {
                setListArray(response.data.listData);
            })
    }, [refreshBoard]);
    /*
axios.get(`/api/users/${boardId}`)  //获取看板所有成员
    .then(response => {
        setMemberArray(response.data.memeberData);
    })*/


    const createList = (e) => {
        e.preventDefault();

        axios.post("/api/lists", { listTitle: newListTitle, BoardId: boardId })
            .then((response) => {
                console.log(response);
                setListArray([...listArray, response.data]);
                resetListTitle();
                toggleAddListBtn();
                setRefreshBoard();
            })
    };

    const deleteList = (id) => {
        axios.delete(`/api/lists/${id}`)
            .then(() => {
                const updatedList = listArray.filter(list => list.id !== id);
                setListArray(updatedList);
            })
    }

    const addMember = (email) => {
        axios.post(`/api/users/${email}`, { BoardId: boardId })
            .then((response) => {
                console.log(response);
                setMemberArray([...memberArray, response.data]);
                setRefreshBoard();
            })
    }
    const updateMember = (member) => {
        if (boardInfo.Users) {
            const members = [...boardInfo.Users]
            const index = members.findIndex((item) => item.id === member.id);
            members[index] = member;
            setBoardInfo({ ...boardInfo, Users: members })
        }
    }
    const toggleBoardStarStatus = () => {
        axios.put(`/api/boards/${boardId}`, { isStarred: !isStarred })
            .then(() => {
                toggleStarStatus();
            })
    }
    const handleOnDragEnd = (result) => {
        if (result.destination === null) // prevents a bug where task is dragged else where
            return;

        let sourceObj;//移动的组件
        let sourceContainId = result.source.droppableId;     //移动组件所在容器的id 
        let sourceindex = result.source.index;               //移动组件在容器中的index
        let targetContainId = result.destination.droppableId;//目标组件所在容器的id
        let targetIndex = result.destination.index;          //目标组件的下标
        let type = result.type;                              //移动的类型 （列/卡片)
        if (type === "list") {
            if (sourceindex === targetIndex) {                 //如果拖放回了原位
                return;
            }
            sourceObj = listArray[sourceindex];
            //1 2 3 4 将2移到4,其余向前平移
            //从targetIndex位置的list开始，删除1个元素，然后在该位置新增，
            listArray.splice(sourceindex, 1);                 //删除2， listArrary=1 3 4  
            listArray.splice(targetIndex, 0, sourceObj);    //在其后拼接，listArrary=1 3 4 2
            axios.post("/api/updateListOrder", {
                boardId: boardId,
                sourceObjId: sourceObj.id,
                sourceIndex: sourceindex,
                destinationIndex: targetIndex,
            }).then((response) => {
                console.log(response);
                //setRefreshBoard();
            })
        }
        else if (type === "card") {
            if (sourceContainId === targetContainId && sourceindex === targetIndex) { //如果拖放回了原位
                return;
            }
            listArray.map(list => {
                if (String(list.id) === sourceContainId) {
                    sourceObj = list.Cards[sourceindex];
                    list.Cards.splice(sourceindex, 1);//从sourceindex开始删除，删除1个
                    list.Cards.map(card => {
                        console.log(card.id);
                    })
                }
            });
            // 在目标列中添加
            listArray.map(list => {
                if (String(list.id) === targetContainId) {
                    list.Cards.splice(targetIndex, 0, sourceObj);//从targetIndex位置的card开始，删除0个元素，然后添加targgetCard
                    list.Cards.map(card => {
                        console.log(card.cardTitle)
                    })

                }
            });
            axios.post("/api/change-card-order", {
                cardId: sourceObj.id,
                sourceId: sourceContainId,
                sourceIndex: sourceindex,
                destinationId: targetContainId,
                destinationIndex: targetIndex,
            }).then((response) => {
                console.log(response);
                //setRefreshBoard();
            })
        }
        console.log("移动的是:" + type + " " + sourceObj.id)
        console.log("移动组件所在容器的id:" + " " + sourceContainId)
        console.log("移动组件在原集合中的index是:" + sourceindex)
        console.log("目标组件所在容器的id:" + " " + targetContainId)
        console.log("目标在目标集合中的index是" + targetIndex)
        console.log("--------");
    }

    return (
        <>
            <div className="board_Page" style={{ backgroundImage: `url(${boardInfo.bgImage})` }}>
                <Navbar updateMember={updateMember} />
                <Sidebar isDashboard={false}>
                    <div className="board_main">
                        <div className="board_header">
                            <h1>{boardInfo.name}</h1>
                            {isStarred ? <button className="starbtn" style={{ color: "yellow", background: "transpanrent" }} onClick={toggleBoardStarStatus}><AiFillStar className="staricon" /></button>
                                : <button style={{ color: "white" }} onClick={toggleBoardStarStatus} className="unstarredbtn"><AiOutlineStar className="staricon" /></button>
                            }
                            <Link to="/board-settings" className="settingsLink">Board Settings</Link>

                            <div className="memberbar">
                                {
                                    boardInfo.Users ?
                                        <div className="memberAvatars">
                                            {boardInfo.Users.map(member =>
                                                <Avatar userInfo={member} />
                                            )}
                                        </div>
                                        : null
                                }
                                <div className="add_member_btn">
                                    <AiOutlineUserAdd className="add_member_icon" />
                                    <Editable
                                        className="add_member_editable"
                                        text={"添加成员"}
                                        placeholder="Enter email"
                                        onSubmit={addMember} />
                                </div>
                            </div>

                        </div>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="all_lists" direction="horizontal" type="list">
                                {(provided) => (
                                    <div
                                        className="board_lists"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {listArray.map((list, index) =>
                                            <List
                                                setRefreshBoard={setRefreshBoard}
                                                index={index}
                                                key={list.id}
                                                list={list}
                                                deleteList={deleteList}
                                                boardInfo={boardInfo}
                                                setBoardInfo={setBoardInfo}
                                            />
                                        )}
                                        {provided.placeholder}
                                        <div className="board_add-list">
                                            <form onSubmit={createList}>
                                                <input value={newListTitle} onChange={updateListTitle} onFocus={toggleAddListBtn} placeholder="+ Add a list" />
                                                {
                                                    addListBtn ?
                                                        <button className="add-list-button">Add List</button>
                                                        :
                                                        null
                                                }
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </Sidebar>
            </div>
        </>
    );
};