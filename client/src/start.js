import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer.js";
import * as immutableState from "redux-immutable-state-invariant";



const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);


fetch("/user/id.json")
    .then((res) => res.json())

    .then((data) => {
        console.log("PRESSS", data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.querySelector("main")
            );
        }
    })
    .catch((err) => console.log(err));

