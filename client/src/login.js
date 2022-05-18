import { Component } from "react";
import { Link } from "react-router-dom";
// import ResetPassword from "./resetPassword";
// import App from "./app";

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            email: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log(this.state)
        );
    }

    handleSubmit(e) {
        // if (!this.state) {
        //     console.log("NOOOO");
        //     this.setState({ error: true });
        // }
        e.preventDefault();
        console.log("user try to log inn");
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("result", result);
                if (!result.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/profile");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <section id="loginPage">
                <h2>Please, dive in!</h2>
                {this.state.error && <p>Oops, you have a problem</p>}
                <form id="login" onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        placeholder="E-mail"
                    />
                    <input
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />

                    <button> Dive in!</button>
                </form>
                <p>
                    Not a member? <Link to="/">Create new account!</Link>
                </p>
               
                <Link to="/resetPassword">Reset password</Link>
            </section>
        );
    }
}
