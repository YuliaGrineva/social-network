import { Login } from "./login";
import Registration from "./registration";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FindPeople } from "./findPeople";
import OtherProfile from "./otherProfile";
import  ResetPassword from "./resetPassword";

export default function Welcome() {
    return (
        <section>
            <h1>fishbook!</h1>
            <img className="fish" src="/fish.png" />
            <img className="fish2" src="/fish.png" />
            <img className="bubble" src="/bub.png" />
            <img className="bubble2" src="/bub.png" />
            <img className="bubble3" src="/bub.png" />

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
                <Route path="/resetPassword">
                    <ResetPassword
                        // id={this.state.id}
                        // email={this.state.email}
                        // onSubmitStepOne={this.onSubmitStepOne}
                        // onSubmitStepTwo={this.onSubmitStepTwo}
                        // onInput={this.onInput}
                    />
                </Route>

                {/* <Route path="/reset-password">
                    import FindPeople from "./findPeople";
                </Route> */}
            </BrowserRouter>
        </section>
    );
}
