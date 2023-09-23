import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';
import { useLocation } from 'react-router-dom';
import "../Styles/UniqueChat.css"

export function PersonalChat() {
    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const userName = pathSegments[0];
    const chattingwith = pathSegments[1];

    const [formData, setFormData] = useState({
        name: `${userName}`,
        message: '',
        recipient: `${chattingwith}`,
        sentDate: null,
    });

    const [messagesArray, setMessagesArray] = useState([]);
    const database = getDatabase();



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const trimmedMessage = formData.message.trim();
      
        if (trimmedMessage !== "") {
          const sentDate = new Date().toLocaleString();
          const messagesRef = ref(database, 'messages');
          
          push(messagesRef, { ...formData, message: trimmedMessage, sentDate });
      
          setFormData({
            name: `${userName}`,
            message: '',
            recipient: `${chattingwith}`,
            sentDate: null,
          });
        } else {
          alert("Message cannot be empty or consist of only spaces.");
        }
      };
      
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

    const filteredmessages = messagesArray.filter(
        message => (message.name === userName && message.recipient === chattingwith) || (message.name === chattingwith && message.recipient === userName)
    );

    return (
        <div className='AllChatsContainer2'>
            <div className='AllChatsContainer'>

                <div>
                    <h2>Messages:</h2>
                    <ul>
                        {filteredmessages.map((message, index) => (
                            <li key={index}>
                                <strong>{message.name} ({message.sentDate}):</strong> {message.message}
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="message">Message:</label>
                    <input
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required={true}
                        maxLength={100}
                    />
                    <input type="submit" value="Submit" />
                    <br />
                </form>
            </div>
        </div>
    );
}
