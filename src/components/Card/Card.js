import React, { useState, useEffect } from "react";
import "./Card.css";
import useToggle from "../../hooks/useToggle";
import axios from "axios";
import { BiPencil } from 'react-icons/bi';
import useInputState from "../../hooks/useInputState";
import { Draggable } from "react-beautiful-dnd"
import CardEdit from "../CardEdit/CardEdit";
import CardInfo from "../CardInfo/CardInfo";
import _ from "lodash";
import { CheckSquare} from "react-feather";
import Avatar from "../Avatar/avatar";
import {AiOutlinePaperClip } from "react-icons/ai";
export default function Card(props) {
    const cardId = props.card.id;
    const [showDropdown, setShowDropdown] = useState(false);
    const [isCardEditForm, cardEditToggle] = useToggle(false);
    const [isCardInfo, cardInfoToggle] = useToggle(false);
    const [refreshCard, setRefreshCard] = useToggle(false);              //refreshCard值变化时刷新卡片

    const [cardInfo, setCardInfo] = useState([props.card || []]);

    console.log(cardId + "cardIdcardIdcardId")
    useEffect(() => {//级联查询
        axios.get(`/api/cards/${cardId}`)
            .then(response => {
                setCardInfo(response.data.cardInfo);
            })
        if (props.setBoardInfo) {
            props.setBoardInfo(props.boardInfo);
        }
    }, [refreshCard]);
    const updateCard = (updateCard, id) => {
        console.log("gg")
        axios.put(`/api/cards/${id}`, updateCard);

    }

    return (
        <>
            <Draggable draggableId={String(cardId)} index={props.index}>
                {(provided) =>
                    <div
                        card={props.card}
                        className="card"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        cardTitle={cardInfo.cardTitle}
                    >
                        <button onClick={cardEditToggle} className="pencilbtn"><BiPencil /></button>
                        <div className="cardinfo_box_small">
                            {
                                (!_.isEmpty(cardInfo.Labels)) ?
                                    <div >
                                        <div className="labels">
                                            {cardInfo.Labels.map((lable, index) =>
                                                <label
                                                    className="lablelist_card"
                                                    key={index}
                                                    style={{ backgroundColor: lable.color, color: "#fff" }}
                                                >
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>


                        {
                            <div className="card_title" >
                                <span onClick={cardInfoToggle}> {cardInfo.cardTitle}</span>
                            </div>
                        }

                        {isCardInfo ?
                            <div>
                                <CardInfo
                                    cardId={cardId}
                                    deleteCard={props.deleteCard}
                                    setRefreshCard={setRefreshCard}
                                    updateCard={updateCard}
                                    cardInfoToggle={cardInfoToggle}
                                    cardInfo={cardInfo}
                                    setCardInfo={setCardInfo}
                                    list={props.list}
                                    boardInfo={props.boardInfo}
                                    setBoardInfo={props.setBoardInfo}
                                />
                            </div>
                            :
                            null
                        }
                        <div className="cardinfo_box_small">
                            {
                                cardInfo.dueDate ?
                                    <div className="main_smallbox">
                                        <div className="duedate">{
                                            cardInfo.dueDate
                                        }</div>
                                    </div>
                                    : null

                            }
                            {
                                cardInfo.Tasks ?
                                    <div className="main_smallbox">
                                        <CheckSquare className="tasks_icon" />
                                        <label className="tasks_progress">
                                            {cardInfo.Tasks?.filter((item) => item.completed)?.length}/{cardInfo.Tasks?.length}
                                        </label>
                                    </div>
                                    : null

                            }
                            {
                                cardInfo.Attachments ?
                                    <div className="main_smallbox">
                                        <AiOutlinePaperClip className="attach_icon" />
                                        <label className="tasks_progress">
                                            {cardInfo.Attachments?.length}
                                        </label>
                                    </div>
                                    : null

                            }
                            {
                                <div className="card_members">
                                    {
                                        cardInfo.Users ?
                                            <div className="memberAvatars">
                                                {cardInfo.Users.map(member =>
                                                    <Avatar userInfo={member} />
                                                )}
                                            </div>
                                            : null
                                    }
                                </div>
                            }
                        </div>
                        {
                            isCardEditForm ?
                                <CardEdit
                                    cardInfo={cardInfo}
                                    setCardInfo={setCardInfo}
                                    deleteCard={props.deleteCard}
                                    cardEditToggle={cardEditToggle}
                                    cardInfoToggle={cardInfoToggle}
                                    cardId={cardId} />
                                :
                                null
                        }
                    </div>}
            </Draggable>
        </>
    );
}