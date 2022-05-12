import { Component } from "react";
import ProfilePicture from "./profilePicture";
import UploadPictureModal from "./uploadPictureModal";
import Profile from "./profile";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            bio: "",
            profile_picture_url: "",
            showModal: false,
        };
        this.onProfileClick = this.onProfileClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.handlePicChange = this.handlePicChange.bind(this);
        this.onBioUpdate = this.onBioUpdate.bind(this);
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

    onBioUpdate(newBio) {
        console.log("New Bio Updated", newBio);
        this.setState({ bio: newBio });
        console.log(" Updated STATE", this.state.bio);
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
                            type={"header"}
                        />
                    </header>
                    <main className="container">
                        <h2>
                            Welcome {this.state.firstname} {this.state.lastname}
                            !
                        </h2>
                    </main>
                    <footer> &#9875; Bul-bul 2022</footer>
                    {this.state.showModal && (
                        <UploadPictureModal
                            closeModal={this.closeModal}
                            onUpload={this.onUpload}
                        />
                    )}
                    <Profile
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        bio={this.state.bio}
                        profile_picture_url={this.state.profile_picture_url}
                        onUpload={this.onUpload}
                        closeModal={this.closeModal}
                        onProfileClick={this.onProfileClick}
                        showModal={this.showModal}
                        onBioUpdate={this.onBioUpdate}
                    />
                </div>
            )
        );
    }
}
