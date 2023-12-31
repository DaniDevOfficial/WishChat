import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';
import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';
import { v4 } from 'uuid'

import { storage } from '../firebaseConfig';
import { FaPaperPlane, FaFileImage, FaTimes } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { io } from 'socket.io-client';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../Styles/UniqueChat.css";
import profilepic from '../Images/TempProfilepic.jpeg';
import { Tooltip } from './SmallComps/Tooltip';


const socket = io('http://localhost:3001/');
export function PersonalChat({ user, chattingWith }) {
    const [imageUpload, setImageUpload] = useState(null)
    const [showRemoveIcon, setShowRemoveIcon] = useState(false);

    const [messagesArray, setMessagesArray] = useState([]);
    const database = getDatabase();
    const bottomRef = useRef(null);
    const userName = user;
    let chattingwith = chattingWith


    const initialFormData = {
        name: userName,
        message: '',
        recipient: chattingwith,
        sentDate: null,
        fileType: null,
        fileURL: null,
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView();
        }
    }, [chattingwith]);

    useEffect(() => {
        setFormData({ ...formData, recipient: chattingwith });
    }, [chattingwith]);



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const messagesRef = ref(database, 'messages');

    function currentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fileType = "img";
        const messageData = await uploadFile(fileType);

        const trimmedMessage = formData.message.trim();

        if (trimmedMessage !== "" || imageUpload) {
            const sentDate = currentDate();

            formData.fileType = messageData.fileType;
            formData.fileURL = messageData.fileURL;
            formData.message = trimmedMessage;
            formData.sentDate = sentDate;


            if (socket.connected) {

                socket.emit('send message', formData);

            } else {
                const messagesRef = ref(database, 'messages');
                push(messagesRef, formData);
            }
            setFormData({
                name: `${userName}`,
                message: '',
                recipient: `${chattingwith}`,
                sentDate: null,
                fileType: null,
                fileURL: null,
            });

            setTimeout(() => {
                bottomRef.current.scrollIntoView({});
            }, 10);
        }
    };
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImageUpload(selectedImage);
        setShowRemoveIcon(!!selectedImage);
    };
    const uploadFile = (fileType) => {
        const messageDataInitial = {
            fileType: null,
            fileURL: null,
        };
        if (imageUpload == null) return (messageDataInitial);
        const imageRef = storageRef(storage, `image/chatUploads/${imageUpload.name + v4()}`);
        return uploadBytes(imageRef, imageUpload)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                const messageData = {
                    fileType: fileType,
                    fileURL: url,
                };

                setImageUpload(null);

                return messageData;
            })
            .catch((error) => {
                console.error('Error uploading Image:', error);
            });
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImageUpload(null);
        setShowRemoveIcon(false);
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

                if (bottomRef.current) {
                    bottomRef.current.scrollIntoView({});
                }
            }
        });

        return () => {
            off(messagesRef);
        };
    }, [database]);

    const filteredmessages = messagesArray.filter(message =>
        (message.name.toLowerCase() === userName.toLowerCase() && message.recipient.toLowerCase() === chattingwith.toLowerCase()) ||
        (message.name.toLowerCase() === chattingwith.toLowerCase() && message.recipient.toLowerCase() === userName.toLowerCase())
    );

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    }


    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    }

    function isToday(date) {
        const today = new Date();
        const checkingDate = new Date(date);
        return (
            checkingDate.getFullYear() === today.getFullYear() &&
            checkingDate.getMonth() === today.getMonth() &&
            checkingDate.getDate() === today.getDate()
        );
    }

    function isYesterday(date) {
        const yesterday = new Date();
        const checkingDate = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        return (
            checkingDate.getFullYear() === yesterday.getFullYear() &&
            checkingDate.getMonth() === yesterday.getMonth() &&
            checkingDate.getDate() === yesterday.getDate()
        );
    }
    function splitMessagesByDate(messages) {
        const messagesByDate = [];
        let currentDate = null;

        messages.forEach((message) => {
            const messageDate = formatDate(message.sentDate);
            if (messageDate !== currentDate || currentDate === "Today" || currentDate === "Yesterday") {
                let tmp = currentDate;

                if (isToday(message.sentDate)) {
                    tmp = "Today";
                    currentDate = messageDate;
                }
                else if (isYesterday(message.sentDate)) {
                    tmp = "Yesterday";
                    currentDate = messageDate;
                } else {
                    tmp = messageDate;
                    currentDate = messageDate;
                }
                messagesByDate.push({ newDate: tmp });
            }

            messagesByDate.push({
                name: message.name,
                message: message.message,
                recipient: message.recipient,
                sentDate: message.sentDate,
                fileType: message.fileType,
                fileURL: message.fileURL,
            });
        });

        return messagesByDate;
    }
    console.log(splitMessagesByDate(filteredmessages));
    const messagesByDate = splitMessagesByDate(filteredmessages);
    const formatTimestamp = (timestamp) => {

        const date = new Date(timestamp);
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    };

    return (
        <div className=''>
            {chattingWith ? (
                <div className="TopPart">
                    <div className="TopLeft">
                        <img className="ProfilePic" src={profilepic} alt="" />
                        <div className="ChatName">
                            <div className="ChatNameName">
                                {chattingWith}
                            </div>
                            <div className="ChatNameStatus">
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="NoChattingWith">
                    Start Chatting by adding new friends or continue chatting with them
                </div>
            )}

            {chattingWith && (
                <div className=''>
                    <div className="MessagesContainer">
                        {messagesByDate.map((message, index) => (
                            <div key={index}>
                                {message.newDate && (
                                    <div className="Date">
                                        {message.newDate}
                                    </div>
                                )}

                                {!message.newDate && (
                                    <div className="SingleMessageContainer">
                                        <div className={`SingleMessage ${message.name.toLowerCase() === userName.toLowerCase() ? 'mymessage' : 'notmymessage'}`}>
                                            <div className="SingleMessageName">
                                                <div className="MessageTopPartContainer">
                                                    <div>
                                                        {message.name}
                                                    </div>

                                                    <div className="SingleMessageDate">
                                                        {formatTimestamp(message.sentDate)}
                                                    </div>
                                                </div>
                                            </div>

                                            {message.fileType === "img" && (
                                                <div className="SingleMessageImage">
                                                    <img src={message.fileURL} alt="Image" />
                                                </div>
                                            )}

                                            <div className="SingleMessageMessage">
                                                {message.message}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}


                    </div>
                    <div ref={bottomRef}></div>

                    <div className="BottomPart">
                        <form className="newMessageForm" onSubmit={handleSubmit}>
                            <input
                                className="messageInput"
                                name="message"
                                placeholder='New Message ...'
                                value={formData.message}
                                onChange={handleInputChange}
                                required={true}
                            />
                            <button className='sendMessage' onClick={handleSubmit}>
                                <FaPaperPlane className='icon' />
                            </button>
                        </form>
                        <input
                            type="file"
                            accept="image/*"
                            id="FileInput"
                            onChange={handleImageChange}

                        />
                        {showRemoveIcon ? (
                            <Tooltip text={"Remove Image"}>
                                <label className="CustomFileInput" htmlFor="FileInput">
                                    <FaTimes onClick={handleRemoveImage} />
                                </label>
                            </Tooltip>

                        ) : (
                            <Tooltip text={"Add Image"}>
                                <label className="CustomFileInput" htmlFor="FileInput">
                                    <FaFileImage />
                                </label>
                            </Tooltip>
                        )}
                    </div>
                </div>
            )}
        </div>

    );
}
