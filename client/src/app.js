import { Component } from "react";
import ProfilePicture from "./profilePicture";
import UploadPictureModal from "./uploadPictureModal";
// import Profile

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            profile_picture_url: "",
            showModal: false,
        };
        this.onProfileClick = this.onProfileClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.handlePicChange = this.handlePicChange.bind(this);
    }
    componentDidMount() {
        fetch("/api/users/me")
            .then((res) => res.json())
            .then((data) => {
                console.log("22", data.rows[0]);
                this.setState(data.rows[0]);
                console.log("333", this.state);
            });
    }
    onProfileClick() {
        this.setState({
            showModal: true,
        });
    }
    closeModal() {
        this.setState({
            showModal: false,
        });
    }
    onUpload(new_profile_url) {
        this.setState({
            profile_picture_url: new_profile_url,
        });
    }
    handlePicChange(e) {
        this.setState({
            picFile: e.target.value,
        });
    }
    render() {
        return (
            console.log("Hello World", this.state),
            (
                <div className="app">
                    <header>
                        <nav>Home</nav>
                        <ProfilePicture
                            profile_picture_url={this.state.profile_picture_url}
                            onImgClick={this.onProfileClick}
                        />
                    </header>
                    <main className="container">
                        <h1>
                            Welcome back {this.state.firstname}{" "}
                            {this.state.lastname}
                        </h1>
                    </main>
                    <footer>Bul bul</footer>
                    {this.state.showModal && (
                        <UploadPictureModal
                            closeModal={this.closeModal}
                            onUpload={this.onUpload}
                        />
                    )}
                </div>
            )
        );
    }
}
