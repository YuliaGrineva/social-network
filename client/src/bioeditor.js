import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        console.log("BIO", props);
        super(props);

        this.state = {
            isEditing: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.showEditor = this.showEditor.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("NEW BIO", e.target.bio);
        const newBio = e.target.bio.value;
        console.log("NEW BIO", newBio);
        fetch("/api/users/bio", {
            method: "POST",
            body: JSON.stringify({ bio: newBio }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())

            .then((data) => {
                console.log("IS IT", data);

                // von app
                // this.props.onBioUpdate(newBio);
                this.props.onBioUpdate(data.bio);
                this.setState({ isEditing: false });
            });
    }
    showEditor() {
        this.setState({ isEditing: true });
    }

    render() {
       

        console.log("PROPS BIO", this.props.bio);

        if (!this.props.bio && !this.state.isEditing) {
            return <button onClick={this.showEditor}>Tell about you</button>;
        } else if (this.state.isEditing) {
            return (
                <form onSubmit={this.onSubmit}>
                    <textarea
                        id="addbio"
                        name="bio"
                        placeholder="Tell about you"
                    ></textarea>
                    <button id="savebio">Save</button>
                </form>
            );
        } else  {
            return (
                <>

                    <p className="ppp">{this.props.bio}</p>
                    <button onClick={this.showEditor}>Edit</button>
                </>
            );
        }
    }
}
