import React, { useState } from "react";
import "./Contact.scss";
import Header from '../../components/header/Header';
import { useNavigate } from "react-router-dom";

function contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    async function registerUser(event) {
        event.preventDefault();
        
        const response = await fetch ("http://localhost:3000/api/contact",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                message,
            }),
        });

        const data = await response.json();

        if(data.status === "ok") {
            alert("Successfully Submitted");
            navigate("/Mplogin")
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
                        
                        <h1 className="title">Contact us</h1>
                        <p className="description">
                            Need to get in touch with us? Either fill out the form with your inquiry or call us!
                        </p>
                    </div>
                </div>
                <div className="right">
                    <div className="rightContainer">
                        <h1>Thanks for contacting!</h1>
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
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                name="phone"
                                id="phone"
                                placeholder="Phone"
                                autoComplete="off"
                            />
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                name="message"
                                id="message"
                                placeholder="Message"
                                autoComplete="off"
                            />
                            <input type="submit" value="Submit" id="submit"  />
                        </form>
                    </div>
                </div>
            </div>
        </>
   
  )
}

export default contact
