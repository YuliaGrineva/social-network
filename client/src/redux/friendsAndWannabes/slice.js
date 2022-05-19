export function friendsAndWannabesReducer(friendsAndWannabes = [], action) {
    // Your Logic Goes Here
    if (action.type == "friendsAndWannabes/receivedFriendsAndWannabes") {
        friendsAndWannabes = [
            ...friendsAndWannabes,
            ...action.payload.friendsAndWannabes,
        ];
        console.log("LALAL", action.payload.friendsAndWannabes);
    } else if (action.type === "friendsAndWannabes/unfriend") {
        console.log("Action dot payload jujuj", action.payload);
        friendsAndWannabes = friendsAndWannabes.filter((item) => {
            return item.id !== action.payload.id;
        });
    } else if (action.type === "friendsAndWannabes/accept") {
        console.log("Action dot payload accept", action.payload);
        friendsAndWannabes = friendsAndWannabes.map((item) => {
            if (item.id === action.payload.id) {
                // object property accepted auf true danach return item
                const copyItem = {
                    ...item,
                    accepted: true,
                };
                return copyItem;
            } else {
                return item;
            }
        });
    }

    console.log("friendsAndWannabes1111", friendsAndWannabes);
    return friendsAndWannabes;
}
// ACTION CREATORS -----------------------------------
// Your action creators go here
export function receiveFriendsAndWannabes(friendsAndWannabes) {
    console.log("data in slice", friendsAndWannabes);
    return {
        type: "friendsAndWannabes/receivedFriendsAndWannabes",
        payload: { friendsAndWannabes },
    };
}

export function unfriend(id) {
    return {
        type: "friendsAndWannabes/unfriend",
        payload: { id },
    };
}

export function accept(id) {
    return {
        type: "friendsAndWannabes/accept",
        payload: { id },
    };
}
