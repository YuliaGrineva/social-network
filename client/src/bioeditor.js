import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        
        super(props);

        this.state = {
            isEditing: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.showEditor = this.showEditor.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        
        const newBio = e.target.bio.value;
     
        fetch("/api/users/bio", {
            method: "POST",
            body: JSON.stringify({ bio: newBio }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())

            .then((data) => {
                this.props.onBioUpdate(data.bio);
                this.setState({ isEditing: false });
            });
    }
    showEditor() {
        this.setState({ isEditing: true });
    }

    render() {

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
                <div id="editor">

                    <p id="ppp">{this.props.bio}</p>
                    <button onClick={this.showEditor}>Edit</button>
                </div>
            );
        }
    }
}
