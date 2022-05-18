import { useSelector } from "react-redux";

export default function Friends() {
    console.log("PROPS");

    // const friends = useSelector((state) => {
    //     return state.friendsAndWannabes.filter(({ accepted }) => accepted);
    // });
    // const wannabes = useSelector((state) => {
    //     return state.friendsAndWannabes.filter(({ accepted }) => !accepted);
    // });

    return (
        <section>
            <h3>Your Friends</h3>

            <h3>Wannabe Friends</h3>
        </section>
    );
}
