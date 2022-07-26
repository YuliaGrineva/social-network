export function friendsAndWannabesReducer(friendsAndWannabes = [], action) {
   
    if (action.type == "friendsAndWannabes/receivedFriendsAndWannabes") {
        friendsAndWannabes = [...action.payload.friendsAndWannabes];
    } else if (action.type === "friendsAndWannabes/unfriend") {
        friendsAndWannabes = friendsAndWannabes.filter((item) => {
            return item.id !== action.payload.id;
        });
    } else if (action.type === "friendsAndWannabes/accept") {
        friendsAndWannabes = friendsAndWannabes.map((item) => {
            if (item.id === action.payload.id) {
                
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

    return friendsAndWannabes;
}

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
