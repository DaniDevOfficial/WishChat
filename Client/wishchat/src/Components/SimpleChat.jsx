import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Link } from 'react-router-dom';
import '../Styles/AllChats.css'
import profilePic from '../Images/TempProfilepic.jpeg'
export function SimpleChat({ user, setChattingWith }) {
    const userName = user

    const [wantToChatWith, setWantToChatWith] = useState()

    const handleChattingWithChange = (event) => {
        setWantToChatWith(event.target.value)
    };

    const handleChatLinkClick = (name) => {
        setChattingWith(name);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setChattingWith(wantToChatWith)
        setWantToChatWith('');
    }
    const [messagesArray, setMessagesArray] = useState([]);
    const database = getDatabase();

    useEffect(() => {
        const messagesRef = ref(database, 'messages');
        onValue(messagesRef, (snapshot) => {
            if (snapshot.exists()) {
                const messages = [];
                snapshot.forEach((childSnapshot) => {
                    const message = childSnapshot.val();
                    messages.push(message);
                });
                setMessagesArray(messages);
            }
        });

        return () => {

            off(messagesRef);
        };
    }, [database]);

    const filteredChatsWith = messagesArray.filter(
        message => message.name === userName || message.recipient === userName
    );

    const uniqueConversations = new Map();

    filteredChatsWith.forEach(message => {
        const isMyMessage = message.name === userName;
        const key = isMyMessage ? message.recipient : message.name;
        let content = message.message;

        if (content.length > 30) {
            content = content.substring(0, 30) + '...';
        }

        if (!uniqueConversations.has(key) || message.sentDate > uniqueConversations.get(key).sentDate) {
            uniqueConversations.set(key, { name: key, message: content, sentDate: message.sentDate });
        }
    });

    const latestMessages = Array.from(uniqueConversations.values());



    return (
        <div className='AllChatsContainer2'>
            <div className='AllChatsContainer'>
                <div>
                    <div className="YourName"></div>
                    <div className="uniqueChatBoxContainer noLinkStyling" >
                        <div className="ProfilePicAllChats">
                            <img className="ProfilePicSmall" src={profilePic} alt="" />
                        </div>
                        <div className="noLinkStyling" >
                            <div className="singleChatLinkContainer">
                                Your Username: {userName}
                            </div>
                        </div>
                    </div>

                    {latestMessages.map((message, index) => (
                        <div className="uniqueChatBoxContainer" onClick={() => handleChatLinkClick(message.name)}>
                            <div className="ProfilePicAllChats">
                                <img className="ProfilePicSmall" src={profilePic} alt="" />
                            </div>
                            <div className="noLinkStyling" >
                                <div className="singleChatLinkContainer" key={index}>
                                    <strong>{message.name} </strong> <div className="newestMessage">{message.message}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr />
                    <form className='addNewFriend' onSubmit={handleSubmit}>
                        <div className="subtitle">Add a new Friend</div>
                        <input
                            className='NewFriendInput'
                            placeholder='Their Username...'
                            type="text"
                            id="name"
                            name="name"
                            value={wantToChatWith}
                            onChange={handleChattingWithChange}
                            required={true}
                        />
                    </form>
                    <div
                        className="buttonContainer"
                    >
                        <input
                            type='submit'
                            onClick={handleSubmit}
                            className={`newChatButton ${!wantToChatWith ? 'disabledButton' : ''}`}
                            disabled={!wantToChatWith}
                            value={"+"}
                        >
                            
                        </input>
                    </div>
                </div>
            </div>
        </div>
    );
}
