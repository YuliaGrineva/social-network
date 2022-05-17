import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import FriendsButton from "./FriendsButton";

export default function OtherProfile() {
    const { otherUserId } = useParams();
    const [user, setUser] = useState({});
    const [err, setErr] = useState("");
   
    console.log("history:", history);
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
    }, []);

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
        </>
    );
}
