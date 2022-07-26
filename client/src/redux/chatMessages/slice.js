export function chatMessagesReducer(chat = [], action) {
    return chat;
}


export function getMessages() {
    return {
        type: "getMessages",
        payload: { },
    };
}

export function createMessage(sender_id, text) {
    return {
        type: "createMessage",
        payload: { sender_id, text },
    };
}
