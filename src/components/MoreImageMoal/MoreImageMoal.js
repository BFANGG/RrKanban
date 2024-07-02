import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import "./MoreImageModel.css";



export default function MoreImageModel(props) {
    const [bgImagesList, setBgImagesList] = useState([]);

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("wallpaper");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const client_id = "GE5Rq5870hRS5EFr16CziQlgWpIfXztEwN2Hm1MjRQw";
    const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

    const fetchImages = () => {
        axios
            .get(fetchUrl, {
                headers: {},
            })
            .then((response) => {
                setData([...data, ...response.data.results]);
            })
            .catch((error) => {
                console.log(error);
            });
        setPage(page + 1);
    }

    const searchImages = (e) => {
        if (e.keyCode === 13) {
            setQuery(e.target.value);
            setData([]);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [query]);


    // Add outline over selected background image - Set state to be image URL
    const handleBoardSelect = (bgImage, evt) => {
        const backgrounds = document.querySelector("#bg-select-1");
        console.log(backgrounds)
        for (let i = 0; i < backgrounds.children.length; i++) {
            console.log("a")
            backgrounds.children[i].children[0].style.outline = "none";
        }
        props.setBoardBg(bgImage);
        evt.target.style.outline = "2px solid #026AA7";
    }

    return (
        <div className="MoreImageModel">
            <div className="modelheading">
                <h3>照片来自 unsplash</h3>
                <button aria-label="Close" onClick={props.setMoreImageToggle} ><AiOutlineClose className="icon" /></button>
            </div>
            <input
                type="text"
                placeholder="Search For Images 🔎"
                onKeyUp={(e) => { searchImages(e) }}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.defaultPrevented) e.preventDefault(); }}
            />
            <hr />
            <InfiniteScroll
                dataLength={data.length}
                next={fetchImages}
                hasMore={hasMore}
                loader={<p>Load more...</p>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <form>
                    <div className="backgroundSelect">
                        <label htmlFor="bg-select" className="text">Choose a background:</label>
                        <ul id="bg-select-1" name="bg-image" className="backgroundBtns" >
                            {
                                data.map(data => (
                                    <li key={data.urls.full} value="">
                                        <button id="bf-select-btn" onClick={(e) => handleBoardSelect(`${data.urls.full}`, e)} type="button"
                                            style={{ backgroundImage: `url(${data.urls.full})` }}></button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </form>
            </InfiniteScroll>
        </div>
    );
}