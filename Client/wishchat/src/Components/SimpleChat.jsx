import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../Styles/AllChats.css'
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

    const uniqueConversations = new Map();

    messagesArray.forEach(message => {
        const key = message.name === userName ? message.recipient : message.name;

        if (!uniqueConversations.has(key)) {
            uniqueConversations.set(key, [message]); 
        } else {
            const currentConversation = uniqueConversations.get(key);
            currentConversation.push(message); 
            uniqueConversations.set(key, currentConversation); 
        }
    });


    const lastMessagesInConversations = Array.from(uniqueConversations.values()).map(conversation => conversation[conversation.length - 1]);

    console.log('Last Messages in Conversations:', lastMessagesInConversations);


    const uniqueNames = new Set();

    filteredChatsWith.forEach(message => {
        if (message.name !== userName) {
            uniqueNames.add(message.name);
        }
        if (message.recipient !== userName) {
            uniqueNames.add(message.recipient);
        }
        if (message.recipient === userName && message.name === userName) {
            uniqueNames.add(message.recipient);
        }
    });
    const ChatWithPerson = Array.from(uniqueNames);






    return (
        <div className='AllChatsContainer2'>
            <div className='AllChatsContainer'>
                <div className="YourName">Your Username: {userName}</div>
                <div>
                    {ChatWithPerson.length > 0 && (
                        <>
                            <h2>You have chats with:</h2>
                            {ChatWithPerson.map((name, index) => (
                                <Link className="noLinkStyling" to={`${name}`}>  <div className="singleChatLinkContainer" key={index}>
                                    <strong>
                                        {name}
                                    </strong>
                                    <div className="latestmessage">This is a old message</div>
                                </div>
                                </Link>
                            ))}
                        </>
                    )}
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
