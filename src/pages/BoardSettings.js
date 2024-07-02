import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import BoardEdit from "../components/BoardEdit/BoardEdit";
import axios from "axios";
import  "./BoardSettings.css";

export default function BoardSettings() {
    const [boardsList, setBoardsList] = useState([]);

    useEffect(() => {
        axios.get("/api/boards")
            .then(response => {
                console.log(response.data.boardData)
                setBoardsList(response.data.boardData);
            })
    }, []);

    const deleteBoard = (id) => {
        axios.delete(`/api/boards/${id}`)
            .then(() => {
                const updatedList = boardsList.filter(b => b.id !== id);
                setBoardsList(updatedList);
            })
    }

    const updateBoard = (id, updateBoard) => {
        axios.put(`/api/boards/${id}`, updateBoard)
            .then(() => {
                const updatedList = boardsList.map(board => {
                    if(board.id === id) {
                        return {...board, ...updateBoard}
                    }
                    return board;
                })
                setBoardsList(updatedList);
            });
    }

    return (
        <>
        <Navbar />
        <div className="settingsContainer">
            <header className="settingsHeader">
                <h1>Board Settings</h1>
                <p>Manage your boards: edit or delete boards from existence.</p>
                <hr />
            </header>
            <main className ="boardSettingsList">
                {boardsList.map(b => (
                    <BoardEdit
                        key={b.id}
                        boardInfo={b} 
                        deleteBoard={deleteBoard}
                        updateBoard={updateBoard}
                    />
                ))}
            </main>
        </div>
        </>
    );
};