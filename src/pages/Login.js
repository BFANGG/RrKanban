import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { BsKanban } from 'react-icons/bs';
import "./Login.css"
import loginimg from '../images/loginimg.jpg';

export default function Login(props) {
    const [email, updateEmail, resetEmail] = useInputState("");
    const [password, updatePassword, resetPassword] = useInputState("");
    const [loginMsg, setLoginMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/api/login", { email: email, password: password })
            .then((res) => {
                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                props.routeProps.history.push("/dashboard");
            })
            .catch(error => {
                setLoginMsg(error.response.data);
                console.log(error.response.data);
                resetEmail();
                resetPassword();
            })
    }

    return (
        <main className="userLogPage">
            <div>
                <div className="logoName"><BsKanban /> <p>Rrkanban</p></div>
                {loginMsg ?
                    <div className="message">
                        <p>{loginMsg}</p>
                        <button type="button" onClick={() => setLoginMsg("")}><ImCross /></button>
                    </div>
                    : null
                }
            </div>
            <div className="loginbox">
                <img className='loginimg' src={loginimg} alt=''></img>
                <div className="smallbox">
                    <div className="formContainer">
                        <form onSubmit={handleSubmit}>
                            <h1 className="title">Log in to Rrkanban</h1>
                            <input className="email" type="email" value={email} onChange={updateEmail} placeholder="Enter email" required />
                            <input className="psw" type="password" value={password} onChange={updatePassword} placeholder="Enter password" required />
                            <button className="loginbtn">Log In</button>
                        </form>
                        <div className="signup">
                            <h className="text">Don't have an account?</h>
                            <Link to="/signup"><div className="link">Sign Up</div></Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}