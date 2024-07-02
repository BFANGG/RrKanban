import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import axios from "axios";
import { ImTrello, ImCross } from "react-icons/im";
import "./SignIn&Up.css"
import loginimg from '../images/loginimg.jpg';
import { BsKanban } from 'react-icons/bs';

export default function Signup(props) {
    const [name, updateName] = useInputState("");
    const [email, updateEmail] = useInputState("");
    const [password, updatePassword, resetPassword] = useInputState("");
    const [passwordConfirm, updatePasswordConfirm, resetPasswordConfirm] = useInputState("");
    const [signupMsg, setSignupMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setSignupMsg("Your passwords do not match!")
        } else {
            axios.post("/api/register", { email: email, password: password, name: name })
                .then((res) => {
                    sessionStorage.setItem("user", JSON.stringify(res.data.user));
                    props.routeProps.history.push("/dashboard");
                })
                .catch(error => {
                    setSignupMsg(error.response.data);
                    resetPassword();
                    resetPasswordConfirm();
                })
        }
    }

    return (
        <main className="userLogPage">
            <div className="logoName"><BsKanban /> <p>Rrkanban</p></div>

            {signupMsg ?
                <div >
                    <p>{signupMsg}</p>
                    <button type="button" onClick={() => setSignupMsg("")}><ImCross /></button>
                </div>
                : null
            }

            {/* <div >
                <h1>Sign up for an account</h1>
                <form onSubmit={handleSubmit} >
                    <input type="text" value={name} onChange={updateName} placeholder="Name" required />
                    <input type="email" value={email} onChange={updateEmail} placeholder="Email" required />
                    <input type="password" value={password} onChange={updatePassword} placeholder="Password" required />
                    <input type="password" value={passwordConfirm} onChange={updatePasswordConfirm}placeholder="Confirm Password" required />
                    <button>Sign Up</button>
                </form>
                <hr />
                <div >
                    <Link to="/">Home</Link> ·
                    <Link to="/login">Have an account? Log In</Link>
                </div>
            </div> */}
            <div className="signupbox">
                <img className='loginimg' src={loginimg} alt=''></img>
                <div className="smallbox">
                    <div className="formContainer">
                        <form onSubmit={handleSubmit}>
                            <h1 className="title">Sign up for an account</h1>
                            <input type="text" value={name} onChange={updateName} placeholder="Name" required />
                            <input type="email" value={email} onChange={updateEmail} placeholder="Email" required />
                            <input type="password" value={password} onChange={updatePassword} placeholder="Password" required />
                            <input type="password" value={passwordConfirm} onChange={updatePasswordConfirm} placeholder="Confirm Password" required />
                            <button className="signupbtn">Log In</button>
                        </form>
                        <div className="signup">
                            <h className="text1">Have an account?</h>
                            <Link to="/login"><div className="link1">Login In</div></Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}