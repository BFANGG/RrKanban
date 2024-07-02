import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import NewBoardModal from "../components/NewBoardMoal/NewBoardModal";
import useToggle from "../hooks/useToggle";
import { Link } from "react-router-dom";
import axios from "axios";
import { HiPlusSm } from 'react-icons/hi';
import { RiTrelloFill } from 'react-icons/ri';
import { BsStar } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import "./Dashboard.css"
import Sidebar from "../components/Sidebar/Sidebar";

export default function Dashboard() {
    const [modal, toggleModal] = useToggle(false);
    const [boardsList, setBoardsList] = useState([]);
    const [isAddBoard,setIsAddBoard]=useToggle(false);
    useEffect(() => {
        // If a user is not signed in (sessionStorage) redirect them to login
        const user = sessionStorage.getItem("user");
        if (!user) window.location.replace("/login");
        //找到用户的所有看板
        axios.get("/api/boards")
            .then(response => {
                setBoardsList(response.data.boardData);
        })
    }, [setBoardsList]);

    const createBoard = (boardInfo) => {
        axios.post("/api/boards", boardInfo)
            .then((response) => {
                setBoardsList([...boardsList, response.data]);
            })
    }


    /** <aside className="sidebar">
         <ul>
             <div>
                 <li><Link to="/dashboard" className="sideLink"><RiTrelloFill   className="icon"/> Boards</Link></li>
                 <li><button onClick={toggleModal}><HiPlusSm  className="icon"/> Create Board</button></li>
             </div>
             <li><a href="/board-settings" className="sideLink"><IoSettingsSharp  className="icon"/> Board Settings</a></li>
         </ul>
     </aside>*/

    return (
        <>
            <div className="dashboard">
                <Navbar />
                <Sidebar boardsList={boardsList} >
                    <main className="dashMain">
                        <header>
                                <h1>Rrkanban Boards</h1>
                                <p>Get started with a new board or continue working in an existing board to start your project.</p>
                                <button className="createBoardMainBtn" onClick={toggleModal}>Create Board</button>
                        </header>
                        <hr />


                        <section>
                            <h2><BsStar /> Starred Boards</h2>
                            <div className="dashboardBoards">
                                {boardsList && boardsList.map(d => (
                                    d.isStarred ?
                                        <div key={d.id} style={{ backgroundImage: `url(${d.bgImage})` }}>
                                            <a href={`/board/${d.id}`} className="boardLink">{d.name}</a>
                                        </div>
                                        : null
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2><RiTrelloFill /> All Boards</h2>
                            <div className="dashboardBoards">
                                {boardsList.map(d => (
                                    <div key={d.id} style={{ backgroundImage: `url(${d.bgImage})` }}>
                                        <a href={`/board/${d.id}`} className="boardLink" >{d.name}</a>
                                    </div>
                                ))}
                                <button onClick={toggleModal} className="createBoardBtn"><HiPlusSm /> Create Board</button>
                            </div>
                        </section>
                    </main>
                    {modal ?
                        <NewBoardModal
                            toggleModal={toggleModal}
                            createBoard={createBoard}
                        />
                        : null
                    }
                </Sidebar>
            </div>
        </>
    );
};