import React, { useState } from "react";
import userPic from "../../dashboard.svg";
import "./Register.scss";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function registerUser(event) {
        event.preventDefault();
        
        const response = await fetch ("https://marketplacee.herokuapp.com/api/register",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await response.json();

        if(data.status === "ok") {
            alert("Successfully Registered");
            navigate("/login")
        } else {
            alert("data.error");
        }
        console.log(data);
    }
    return (
        <>
        <Header />
            <div className="dashboard">
                <div className="left">
                    <div className="leftContainer">
                        <div className="imgContainer">
                            { <img src={userPic} alt="user_img" className="userImg" /> }
                        </div>
                        <h1 className="title">Welcome to your Dashboard</h1>
                        <p className="description">
                            Your uploaded APIs will be displayed here once you login to your
                            account
                        </p>
                    </div>
                </div>
                <div className="right">
                    <div className="rightContainer">
                        <h1>Register for a new account</h1>
                        <form className="loginForm" onSubmit={registerUser}>
                        <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="name"
                                id="name"
                                placeholder="Name"
                                autoComplete="off"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                id="email"
                                placeholder="Email address"
                                autoComplete="off"
                                />
                            <input
                                type="password"
                                value={password}
                                onChange={(e)=>{ setPassword(e.target.value)}}
                                name="password"
                                id="password"
                                placeholder="Password"
                                autoComplete="off"
                            />
                            <input type="submit" value="Login/Signup" id="submit"  />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;