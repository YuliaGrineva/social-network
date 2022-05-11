import { Login } from "./login";
import Registration from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
// import { ResetPassword } from "./resetPassword";

export default function Welcome() {
    return (
        <section>
            <h1>fishbook!</h1>
            <img className="fish" src="/fish.png" />
            <img className="fish2" src="/fish.png" />

            <BrowserRouter>
                <Route id="regrouter" exact path="/">
                    <Registration />
                    <Link to="/login" id="loginButton">
                       Dive in!
                    </Link>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                {/* <Route path="/reset-password">
                    <ResetPassword />
                </Route> */}
            </BrowserRouter>
        </section>
    );
}
