import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";

export default function OtherProfile() {
    const { otherUserId } = useParams();
    const [user, setUser] = useState({});
    const [err, setErr] = useState("");
    const history = useHistory();
    console.log("history:", history);
    useEffect(() => {
        let abort = false;
        fetch("/api/users/" + otherUserId)
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
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
            <h2>
                This is other Profile <br></br>
            </h2>
            <img id="justDivedImg" src={user.profile_picture_url} />
            {user.firstname}
            {user.lastname} <br></br>
            {user.bio}
            {err && <h3>User does not exist</h3>}
        </>
    );
}
