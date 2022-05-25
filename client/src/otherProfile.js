import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import FriendsButton from "./FriendsButton";
import { Link, BrowserRouter } from "react-router-dom";
import { useStore } from "react-redux";

export default function OtherProfile() {
    const { otherUserId } = useParams();
    const [user, setUser] = useState({});
    const [err, setErr] = useState("");
    let [mutualFriend, setMutualFriends] = useState([]);

    useEffect(() => {
        let abort = false;
        fetch("/api/users/" + otherUserId)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
            });
        // if (!abort) {

        //     if (+otherUserId === isOwnProfile) {
        //         history.push("/");
        //     }
        // }
        return () => {
            abort = true;
        };
    }, [otherUserId]);
   

    useEffect(() => {
        fetch(`/api/mutualFriends/` + otherUserId)
            .then((res) => res.json())
            .then((mutualFriend) => {
                console.log("MutualFriend !!", mutualFriend);
                setMutualFriends(mutualFriend.rows);
            });
    }, [otherUserId]);

    return (
        <>
            <h3>Friends Profile</h3>
            <div id="profile">
                <div id="picname">
                    <img
                        id="justDivedImg"
                        src={
                            user.profile_picture_url
                                ? user.profile_picture_url
                                : "/icon.jpeg"
                        }
                    />
                    <h3 id="profilename">
                        {user.firstname} &nbsp;
                        {user.lastname}
                    </h3>
                </div>
                <p id="ppp">{user.bio}</p>

                {err && <h3>User does not exist</h3>}
            </div>
            <FriendsButton otherUserId={otherUserId} />

            {/* friendsButtonUpdate={user.friendsButtonUpdate} */}
            <div>
                <h4 id="other">Other fishes you both know</h4>
                {mutualFriend &&
                    mutualFriend.map((friend) => (
                        <div id="thisUser1" key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                <img
                                    id="otherImg"
                                    src={
                                        friend.profile_picture_url
                                            ? friend.profile_picture_url
                                            : "/icon.jpeg"
                                    }
                                />
                            </Link>

                            <h4>
                                {friend.firstname} {friend.lastname}
                            </h4>
                        </div>
                    ))}
            </div>
        </>
    );
}
