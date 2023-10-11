import React, { useState } from 'react';
import '../Styles/Welcome.css'
import Layout from "../Images/Layout idea.jpg"
import { WelcomeAnimation } from "./WelcomeAnimation"
import { useNavigate } from 'react-router-dom';

export function WelcomeSite({ setMe }) {
    const [name, setName] = useState('');
    let navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleSubmit = () => {
        navigate(`/Chat`);
        setMe(name)
    }
    return (
        <div className="WelcomeContainer">
            <WelcomeAnimation />

            <div className="WelcomeWrapper">

                <div className="WelcomeTextContainer">
                    <div className="MainWelcome">
                        Welcome to WishChat
                    </div>
                    <div className="SecondaryWelcome">
                        This is a small Chatapp created with react and currently with a firebase backend but enjoy your time on it.
                    </div>
                    <div className="SignUpContainer">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name" class="InputLabel">Name</label>
                            <input
                                className='AccountInput'
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                required={true}
                                placeholder='Username'
                            />
                            <label htmlFor="password" class="InputLabel">Password</label>

                            <input
                                className='AccountInput'
                                type="password"
                                id="password"
                                name="password"
                                required={true}
                                placeholder='Password'
                            />
                            <div className="buttonCenter">
                                <input class="SubmitButton" type="submit" />
                            </div>

                        </form>
                    </div>
                </div>

                <div className="WelcomeImageContainer">
                    <img src={Layout} alt="" />
                </div>

            </div>
        </div>
    )
}
