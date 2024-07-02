import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import EditListModal from "../EditListModal/EditListModal";
import useInputState from "../../hooks/useInputState";
import useToggle from "../../hooks/useToggle";
import axios from "axios";
import "./List.css";
import { BsThreeDots } from "react-icons/bs";
import { GrClose } from "react-icons/gr"
import { AiOutlinePlus } from "react-icons/ai"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { X } from "react-feather";
import "./Editable.css"

export default function List(props) {
    const [newCradTitle, updateCardTitle, resetCardTitle] = useInputState("");
    const [listInfo, setListInfo] = useState(props.list || []);
    const [cardArray, setCardArray] = useState(props.list.Cards || []);
    const [listTitle, updateListTitle] = useInputState(props.list.listTitle);
    const [isEditingListTitle, toggleEditListTitle] = useToggle(false);
    const [newCardEdit, setNewCardEdit] = useToggle(false);
    const [listModal, toggleListModal] = useToggle(false);

    useEffect(() => {
        setCardArray(props.list.Cards);
    }, [props.list.Cards]);

    const createCard = (e) => {
        e.preventDefault();
        setNewCardEdit();
        axios.post("/api/cards", { cardTitle: newCradTitle, ListId: props.list.id })
            .then((response) => {
                    setCardArray([...cardArray, response.data]);
                    resetCardTitle();
                    props.setRefreshBoard();
            })
    }
    const deleteCard = (id) => {
        axios.delete(`/api/cards/${id}`)
            .then(() => {
                const updatedList = cardArray.filter(card => card.id !== id);
                setCardArray(updatedList);
                props.setRefreshBoard();
            })
    }

    const handleDelete = () => {
        console.log(props.list.id)
        props.deleteList(props.list.id)
    }

    const handleListTitleUpdate = (e) => {
        e.preventDefault();
        axios.put("/api/lists", { id: props.list.id, listTitle: listTitle })
            .then(() => {
                toggleEditListTitle();
            })
    }

    const inputFocus = () => {
        document.querySelector(`#newCardInput-${props.list.id}`).focus();
    }

    return (
        <Draggable draggableId={String(props.list.id) + "list"} index={props.index} className="listwrapper">
            {
                provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <section className="list">
                            <div className="listHead">
                                {isEditingListTitle ?
                                    <form onSubmit={handleListTitleUpdate} className="title_Update_form">
                                        <input value={listTitle} onChange={updateListTitle} />
                                        <button>Update</button>
                                        <button onClick={toggleEditListTitle}>Cancel</button>
                                    </form>
                                    :
                                    <>
                                        <h3>{listTitle}</h3>
                                        <button className="listOptionsBtn" onClick={toggleListModal}><BsThreeDots /></button>
                                    </>
                                }
                            </div >
                            <Droppable droppableId={String(props.list.id)} type="card" >
                                {provided => (
                                    <div
                                        className="listDropArea"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {cardArray && cardArray.map((card, index) => (
                                            <Card
                                                key={card.id}
                                                index={index}
                                                card={card}
                                                deleteCard={deleteCard}
                                                list={listInfo}
                                                boardInfo={props.boardInfo}
                                                setBoardInfo={props.setBoardInfo}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <div className="editable">
                                {
                                    newCardEdit ? (
                                        <form
                                            className={`editable_edit ${props.editClass ? props.editClass : ""}`}
                                            onSubmit={createCard}
                                        >
                                            <input
                                                type="text"
                                                value={newCradTitle}
                                                onChange={updateCardTitle}
                                                placeholder="为这张卡输入标题..."
                                            />
                                            <div className="editable_edit_footer">
                                                <button type="submit"><div className="add_card_btn">Add Card</div></button>
                                                <X onClick={setNewCardEdit} className="closeIcon" />
                                            </div>
                                        </form>
                                    ) : (
                                        <p
                                            className={`editable_display ${props.displayClass ? props.displayClass : ""
                                                }`}
                                            onClick={setNewCardEdit}
                                        >
                                            + Add Card
                                        </p>
                                    )}
                            </div>

                            {listModal ?
                                <EditListModal
                                    handleDelete={handleDelete}
                                    toggleListModal={toggleListModal}
                                    toggleEditListTitle={toggleEditListTitle}
                                    inputFocus={inputFocus}
                                />
                                :
                                null
                            }
                        </section>
                    </div >
                )
            }
        </Draggable >
    );
}