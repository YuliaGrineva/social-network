import { Component } from "react";
import { Link } from "react-router-dom";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            code: "",
            step: 1,
        };
    }
    onInput(event) {
        // one handler to rule them all!
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    onSubmitStepOne(event) {
        event.preventDefault();
        // use the fetch operation we used to implement the server!
        // if anything goes wrong, update the error message
        // otherwise, increment the step
    }
    onSubmitStepTwo(event) {
        event.preventDefault();
        console.log("step two");
        fetch("/api/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {});
    }
    renderStepOne() {
        return (
            <form onSubmit={this.onSubmitStepOne}>
                <h3>Reset password</h3>
                <h4>Please, enter the email adress whith which you registered</h4>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    onInput={this.onInput}
                />
                <button>Submit</button>
            </form>
        );
    }
    renderStepTwo() {
        return (
            <form onSubmit={this.onSubmitStepTwo}>
                <h3>Reset password</h3>
                <h4>Please, enter the code you received</h4>
                <input
                    onInput={this.onInput}
                    type="text"
                    name="code"
                    placeholder="Code"
                    required
                />
                <h4>Please, enter a new password</h4>
                <input
                    onInput={this.onInput}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <button>Submit</button>
            </form>
        );
    }
    renderStepThree() {
        return (
            <div>
                <h3>Reset password</h3>
                <h2>Your password has been changed!</h2>
                <p>You can now log in with your new password</p>
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
    renderStep() {
        /*eslint indent: [2, 4, {"SwitchCase": 1}]*/
        switch (this.state.step) {
            case 1:
                return this.renderStepOne();
            case 2:
                return this.renderStepTwo();
            case 3:
                return this.renderStepThree();
        }
    }
    render() {
        return (
            <div className="password-reset">
                <h2>Password reset</h2>
                {this.renderStep()}
                <p>{this.state.error}</p>
            </div>
        );
    }
}

export default ResetPassword;
