import { Component } from "react";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};
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
        e.preventDefault();
        console.log("user try to submit");
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    window.location.reload();
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <>
                <h1>Join our community</h1>
                {this.state.error && <p>Oops, you have a problem</p>}
                <form id="registration" onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                    />
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                    />
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

                    <button>Submit</button>
                </form>
            </>
        );
    }
}
