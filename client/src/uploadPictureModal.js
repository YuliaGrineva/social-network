import { Component } from "react";

export default class UploadPictureModal extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        fetch("/user/profile/picture", {
            method: "POST",
            body: new FormData(e.target),
        })
            .then((res) => res.json())
            .then((data) => {
                this.props.onUpload(data.profile_picture_url);
            });
    }
    render() {
        return (
            <div id="modal">
                <button id="close" onClick={this.props.closeModal}>
                    &times;
                </button>
                <div id="modal-content">
                    <h3>Upload profile picture</h3>
                    <form onSubmit={this.onSubmit}>
                        <input
                            id="file"
                            name="image"
                            type="file"
                            accept="image/*"
                        />
                        <button>Upload</button>
                    </form>
                </div>
            </div>
        );
    }
}
