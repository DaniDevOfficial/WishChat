import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';
import { useLocation } from 'react-router-dom';

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
    });

    const [messagesArray, setMessagesArray] = useState([]);
    const database = getDatabase();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const messagesRef = ref(database, 'messages');
        push(messagesRef, formData);

        setFormData({
            name: `${userName}`,
            message: '',
            recipient: `${chattingwith}`,
        });
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
        <div>
            UserName: {userName}
            <form onSubmit={handleSubmit}>

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required={true}
                    maxLength={100}
                />
                <input type="submit" value="Submit" />
                <br />
                Chat With: {chattingwith}
            </form>
            <div>
                <h2>Messages:</h2>
                <ul>
                    {filteredmessages.map((message, index) => (
                        <li key={index}>
                            <strong>{message.name}:</strong> {message.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
