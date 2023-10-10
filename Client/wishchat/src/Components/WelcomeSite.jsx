import React from "react"
import '../Styles/Welcome.css'
import Layout from "../Images/Layout idea.jpg"
import { WelcomeAnimation } from "./WelcomeAnimation"
export function WelcomeSite() {

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
                </div>

                <div className="WelcomeImageContainer">
                    <img src={Layout} alt="" />
                </div>

            </div>
        </div>
    )
}
