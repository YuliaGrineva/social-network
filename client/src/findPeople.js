import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function FindPeople() {
    const [search, setSearch] = useState([]);
    let [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("search", search);
        if (search.length < 1) {
            console.log("lastUsers");
            fetch("/api/recentUsers")
                .then((res) => res.json())
                .then((users) => {
                    console.log("last users", users);
                    setUsers(users);
                });
        } else {
            fetch(`/api/findusers/${search}`)
                .then((res) => res.json())
                .then((usersFromServer) => {
                    console.log("users from server", usersFromServer);
                    setUsers((users = usersFromServer));

                    console.log("users", users);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [search]);

    return (
        <section id="findPage">
            <h2>Catch your fish!</h2>
            <h3>Check out who just dived</h3>
            {users &&
                users.map((user) => (
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
                    </div>
                ))}

            <h3>Are you looking for some fish?</h3>
            <input
                onChange={(e) => setSearch(e.target.value)}
                type="name"
                name="name"
                placeholder={"Search"}
            />

            {/* <div id="userResults">
                <h2></h2>

                {users &&
                    users.map((user) => (
                        <div id="thisUser" key={user.id}>
                            <h2>They are here!</h2>
                            <img
                                id="justDivedImg"
                                src={user.profile_picture_url}
                            />
                            <h4>
                                {user.firstname} {user.lastname}
                            </h4>
                        </div>
                    ))}
            </div> */}
        </section>
    );
}
