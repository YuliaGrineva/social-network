import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    receiveFriendsAndWannabes,
    unfriend,
    accept,
} from "./redux/friendsAndWannabes/slice";

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("/friendsAndWannabes")
            .then((res) => res.json())
            .then((data) => {
                dispatch(receiveFriendsAndWannabes(data));
            });
    }, []);

    const friends = useSelector((state) => {
        return state.friendsAndWannabes.filter(({ accepted }) => accepted);
    });

    const wannabes = useSelector((state) => {
        return state.friendsAndWannabes.filter(({ accepted }) => !accepted);
    });

    function endFriendship(id) {
        fetch(`/friendship/unfriended/${id}`, {
            method: "POST",
        }).then((res) => res.json());

        let action = unfriend(id);
        dispatch(action);
    }

    function acceptFriendship(id) {
        fetch(`/friendship/accepted/${id}`, {
            method: "POST",
        }).then((res) => res.json());

        let action = accept(id);
        dispatch(action);
    }

    return (
        <section>
            <h1 id="friends">Your Friends</h1>
            <div id="friends-container">
                {friends.length >= 1 ? (
                    friends.map((user) => {
                        return (
                            <div id="thisUser" key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        id="justDivedImg"
                                        src={
                                            user.profile_picture_url
                                                ? user.profile_picture_url
                                                : "/icon.jpeg"
                                        }
                                    />
                                </Link>
                                <h4>
                                    {user.firstname} {user.lastname}
                                </h4>
                                <button
                                    onClick={() => endFriendship(user.id)}
                                    className="accept-button"
                                >
                                    End Friendship
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <h3>No new requests</h3>
                )}
            </div>

            <h1 id="friends">Wannabe Friends</h1>
            <div id="friends-container">
                {wannabes.length >= 1 ? (
                    wannabes.map((user) => {
                        return (
                            <div id="thisUser" key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        id="justDivedImg"
                                        src={
                                            user.profile_picture_url
                                                ? user.profile_picture_url
                                                : "/icon.jpeg"
                                        }
                                    />
                                </Link>
                                <h4>
                                    {user.firstname} {user.lastname}
                                </h4>
                                <button
                                    onClick={() => acceptFriendship(user.id)}
                                    className="accept-button"
                                >
                                    Accept Friendship
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <h3>No new requests</h3>
                )}
            </div>
        </section>
    );
}
