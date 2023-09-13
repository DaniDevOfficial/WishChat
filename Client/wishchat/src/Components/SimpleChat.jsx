import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';
import { useLocation, Link } from 'react-router-dom';
import '../Styles/AllChats.css'
export function SimpleChat() {
    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const userName = pathSegments[0];
    const [isFormVisible, setFormVisible] = useState(false);

    const [wantToChatWith, setWantToChatWith] = useState()
    const handleChattingWithChange = (event) => {
        setWantToChatWith(event.target.value);
    };
    const [formData, setFormData] = useState({
        name: `${userName}`,
        message: '',
    });

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


    const uniqueNames = new Set();

    filteredChatsWith.forEach(message => {
        if (message.name !== userName) {
            uniqueNames.add(message.name);
        }
        if (message.recipient !== userName) {
            uniqueNames.add(message.recipient);
        }
    });
    const ChatWithPerson = Array.from(uniqueNames);


    function newChat () {
        return
    }
    const latestMessage = messagesArray.reduce((latest, message) => {
        if (
            (message.name === userName && message.recipient === "") ||
            (message.name === "chattingwith" && message.recipient === userName)
        ) {
            if (!latest || message.timestamp > latest.timestamp) {
                return message;
            }
        }
        return latest;
    }, null);


    return (
        <div className='AllChatsContainer2'>
            <div className='AllChatsContainer'>
                <div className="YourName">Your Username: {userName}</div>                <div>
                    {ChatWithPerson.length > 0 && (
                        <>
                            <h2>You have chats with:</h2>
                            <ul>
                                {ChatWithPerson.map((name, index) => (
                                    <li key={index}>
                                        <strong>
                                            <Link to={`${name}`}>{name}</Link>
                                        </strong>
                                    </li>
                                ))}
                            </ul>
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
                            onClick={newChat()}
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
