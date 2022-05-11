import { Component } from "react";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            firstname: "",
            lastname: "",
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
        if (!this.state) {
            console.log("NOOOO");
            this.setState({ error: true });
        }
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
                    this.setState({ error: true });
                }
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <section id="registration">
                <h2>Sign Up</h2>
                <p> It is free and always will be</p>

                {this.state.error && <p>Oops, you have a problem</p>}
                <form id="regform" onSubmit={this.handleSubmit}>
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
                <h4 id="moto">
                    Connect with fishes and the world around you on Fishbook.
                </h4>
            </section>
        );
    }
}
