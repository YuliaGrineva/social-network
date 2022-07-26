import { useState, useEffect } from "react";

import io from "socket.io-client";

let socket;

export default function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) {
            socket = io.connect();
        }
        socket.on("getMessages", (data) => {
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
        });
    }, [messages]);

    function onSubmit(event) {
        event.preventDefault();
        const text = event.target.text.value;
        const test = socket.emit("sendMessage", text);
        event.target.text.value = "";
    }

    return (
        <section className="chat">
            <h2>Chat</h2>
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
