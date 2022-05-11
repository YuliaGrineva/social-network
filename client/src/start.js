import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

fetch("/user/id.json")
    .then((res) => res.json())

    .then((data) => {
        console.log("PRESSS", data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    })
    .catch((err) => console.log(err));

    