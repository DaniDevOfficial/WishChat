import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';

export function SimpleChat() {
    const [formData, setFormData] = useState({
        name: '',
        message: '',
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
            name: '',
            message: '',
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={true}
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required={true}
                />

                <input type="submit" value="Submit" />
            </form>

            {/* Display messages */}
            <div>
                <h2>Messages:</h2>
                <ul>
                    {messagesArray.map((message, index) => (
                        <li key={index}>
                            <strong>{message.name}:</strong> {message.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
