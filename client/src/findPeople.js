import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function FindPeople() {
    const [search, setSearch] = useState([]);
    let [users, setUsers] = useState([]);

    useEffect(() => {
        if (search.length < 1) {
            fetch("/api/recentUsers")
                .then((res) => res.json())
                .then((users) => {
                    setUsers(users);
                });
        } else {
            fetch(`/api/findusers/${search}`)
                .then((res) => res.json())
                .then((usersFromServer) => {
                    setUsers((users = usersFromServer));
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
        </section>
    );
}
