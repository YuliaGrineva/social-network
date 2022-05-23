import { useState, useEffect } from "react";
// import { getMessages, createMessage } from "./redux/chatMessages/slice.js";

import io from "socket.io-client";

let socket;

export default function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) {
            socket = io.connect();
        }
        socket.on("getMessages", (data) => {
            console.log("wfwifhewfhew", data);
            setMessages(data);
        });

        return () => {
            socket.off("getMessages");
            socket.off("newMessage");
            socket.disconnect();
            socket = null;
        };
    }, [messages]);

    useEffect(() => {
        socket.on("newMessage", (data) => {
            setMessages([...messages, data]);
            console.log("DATAAAAA", data);
        });
    }, [messages]);

    function onSubmit(event) {
        event.preventDefault();
        const text = event.target.text.value;
        const test = socket.emit("sendMessage", text);
        console.log("TEST", test);
        event.target.text.value = "";
    }

    return (
        <section className="chat">
            <h2>Chat</h2>
            {console.log("messages in chat: ", messages)}
            {messages &&
                messages.map((message) => {
                    return (
                        <div key={message.id}>
                            <p>
                                {message.firstname} says: {message.text}
                            </p>
                        </div>
                    );
                })}
            <form onSubmit={onSubmit}>
                <input name="text"></input>
                <button>SEND MESSAGE</button>
            </form>
        </section>
    );
}
