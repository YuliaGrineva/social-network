import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {

        super(props);
        this.state = {
            email: "",
            step: 1,
        };
        this.onSubmitStepOne = this.onSubmitStepOne.bind(this);
        this.onSubmitStepTwo = this.onSubmitStepTwo.bind(this);
        this.onInput = this.onInput.bind(this);
    }
    onInput(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    onSubmitStepOne(event) {
        event.preventDefault();

        fetch("/api/password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
            }),
            
        })
            .then((response) => {
                if (response.status >= 400) {
                    this.setState({
                        error: "Missing fields",
                    });
                    return;
                }
                return response.json().then((data) => {
                    this.setState({
                        step: 2,
                    });
                });
            })
            .then((data) => {
            })
            .catch((err) => {
                console.log(err);
            });
    }
    onSubmitStepTwo(event) {
        event.preventDefault();
        fetch("/api/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => {
                return res.json().then((data) => {
                    this.setState({
                        step: 3,
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderStepOne() {
        return (
            <form id="reset" onSubmit={this.onSubmitStepOne}>
                <h3>Reset password</h3>
                <h4>
                    Please, enter the email adress whith which you registered
                </h4>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    onInput={this.onInput}
                    key="email"
                    
                />
                <button>Send code</button>
            </form>
        );
    }
    renderStepTwo() {
        return (
            <form id="reset" onSubmit={this.onSubmitStepTwo}>
                <h3>Reset password</h3>
                <h4>Please, enter the code you received</h4>
                <input
                    onInput={this.onInput}
                    type="text"
                    name="code"
                    placeholder="Code"
                    required
                    autoComplete="off"
                    key="code"
                />
                <h4>Please, enter a new password</h4>
                <input
                    autoComplete="off"
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
            <div id="reset">
                <h2>Your password has been changed!</h2>
                <p >
                    You can now <Link to="/login">log in</Link> with your new
                    password.
                </p>
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
