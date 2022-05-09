import ReactDOM from "react-dom";
import Welcome from "./welcome";

fetch("/user/id.json")
    .then((res) => 
        res.json())

    .then((data) => {
        console.log("PRESSS", data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <img src="/fish.png" id="imgWelcome"/>,
                document.querySelector("main")
            );
        }
    })
    .catch((err) => console.log(err));

// ReactDOM.render(<HelloWorld />, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }
