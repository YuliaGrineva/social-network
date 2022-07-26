import { useState, useEffect } from "react";

export default function FriendsButton({ otherUserId }) {
    const [btnText, setBtnText] = useState("");

    useEffect(() => {
        async function getFriendshipStatus() {
            const response = await fetch("/friendship-status/" + otherUserId);
            const friendShipStatus = await response.json();
            if (!friendShipStatus) {
                setBtnText("Make Request");
                return;
            }
            const accepted = friendShipStatus.accepted;
            const incoming = friendShipStatus.sender_id == otherUserId;
            if (accepted) {
                setBtnText("Unfriend");
                return;
            }
            if (!accepted && incoming) {
                setBtnText("Accept Request");
                return;
            } else {
                setBtnText("Cancel Request");
                return;
            }
        }
        getFriendshipStatus();
    }, []);

    function handleClick(e) {
        e.preventDefault();

        fetch("/friendships", {
            method: "POST",
            body: JSON.stringify({
                otherUserId: otherUserId,
                btnText: btnText,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            if (btnText === "Make Request") {
                setBtnText("Cancel Request");
            }
            if (btnText === "Unfriend") {
                setBtnText("Make Request");
            }
            if (btnText === "Accept Request") {
                setBtnText("Unfriend");
            }
            if (btnText === "Cancel Request") {
                setBtnText("Make Request");
            }
        });
    }

    return (
        <button className="" onClick={handleClick}>
            {btnText}
        </button>
    );
}
