import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../Styles/AllChats.css'
import profilePic from '../Images/TempProfilepic.jpeg'
export function SimpleChat() {
    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const userName = pathSegments[0];

    let navigate = useNavigate();

    const [wantToChatWith, setWantToChatWith] = useState()
    const handleChattingWithChange = (event) => {
        setWantToChatWith(event.target.value);
    };

    function newChat() {
        navigate(`${wantToChatWith}`);

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

    console.log(filteredChatsWith);

    const uniqueConversations = new Map();

    filteredChatsWith.forEach(message => {
        const isMyMessage = message.name === userName;
        const key = isMyMessage ? message.recipient : message.name;
        const content = message.message;

        if (!uniqueConversations.has(key) || message.sentDate > uniqueConversations.get(key).sentDate) {
            uniqueConversations.set(key, { name: key, message: content, sentDate: message.sentDate });
        }
    });

    const latestMessages = Array.from(uniqueConversations.values());

    console.log('Unique Names and Latest Messages:', latestMessages);


    return (
        <div className='AllChatsContainer2'>
            <div className='AllChatsContainer'>
                <div className="YourName">Your Username: {userName}</div>
                <div>

                    {latestMessages.map((message, index) => (
                        <div className="uniqueChatBoxContainer">
                            <div className="ProfilePicAllChats">
                                <img className="ProfilePicSmall" src={profilePic} alt="" />
                            </div>
                        <Link className="noLinkStyling" to={`${message.name}`}>
                        <div className="singleChatLinkContainer" key={index}>
                            <strong>{message.name} </strong> <div className="newestMessage">{message.message}</div>
                        </div>
                        </Link>
                        </div>
                    ))}
                    <hr />
                    <form className='addNewFriend'>
                        <div className="subtitle">Add a new Friend</div>
                        <input
                            className='AccountInput'
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
                        <button
                            onClick={newChat}
                            className={`newChatButton ${!wantToChatWith ? 'disabledButton' : ''}`}
                            disabled={!wantToChatWith}
                        >
                            +
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
}
