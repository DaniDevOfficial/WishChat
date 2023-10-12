import React, { useState } from 'react';
import '../Styles/Welcome.css'
import Layout from "../Images/Layout idea.jpg"
import { WelcomeAnimation } from "./WelcomeAnimation"
import { useNavigate, Link } from 'react-router-dom';

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
                        Welcome to WishChat, a small Chatapp created with React and currently powered by a Firebase backend. We hope you enjoy your time on our platform and have meaningful and intuitive conversations with friends and strangers.
                    </div>
                    <div className="SignUpContainer">


                        <form onSubmit={handleSubmit}>
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

                            <input
                                className='AccountInput'
                                type="password"
                                id="password"
                                name="password"
                                required={true}
                                placeholder='Password'
                            />
                            <div className="disclaimer">
                                (the account data isn't actualy saved so dont worry about remembering your Credentials)
                            </div>
                            <div className="buttonCenter">
                                <input
                                    class="SubmitButton"
                                    type="submit"
                                    value={"Sign up"}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="OrLogInText">
                        Or <Link className="LinkTo" to="/SignIn">Log In</Link>
                    </div>
                </div>

                <div className="WelcomeImageContainer">
                    <div className="WelcomeImageWelcome">
                        Welcome
                    </div>
                    <div className="WelcomeImage">
                        <img src="https://firebasestorage.googleapis.com/v0/b/wishchatprog2.appspot.com/o/Images%2FCapybara.png?alt=media&token=4facbe5d-1d95-49ae-b395-aa989fe74ce3&_gl=1*5nfsu0*_ga*MjAzNzYyNzU5LjE2ODM4Mjk0MDU.*_ga_CW55HF8NVT*MTY5NzExMjM2My41MS4xLjE2OTcxMTIzODMuNDAuMC4w" alt="" />
                    </div>

                    <div className='WelcomeImageHaveFun'>
                        Have Fun Chatting
                    </div>
                </div>

            </div>
        </div>
    )
}
