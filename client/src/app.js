import { Component } from "react";
import ProfilePicture from "./profilePicture";
import UploadPictureModal from "./uploadPictureModal";
import Profile from "./profile";
import { FindPeople } from "./findPeople";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherProfile";

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
                
                this.setState(data.rows[0]);
                
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
       
        this.setState({ bio: newBio });
       
    }

    handlePicChange(e) {
        this.setState({
            picFile: e.target.value,
        });
    }

    logout(e) {
        e.preventDefault();
        fetch("/logout")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    return location.replace("/");
                }
            });
    }
    render() {
        return (
            console.log("Hello World", this.state),
            (
                <BrowserRouter>
                    <div className="app">
                        <header>
                            <nav>
                                <Link to="/">
                                    <img src="/logo1.png" id="logo1"></img>
                                </Link>
                            </nav>

                            <h2>
                                Welcome {this.state.firstname}{" "}
                                {this.state.lastname}!
                            </h2>

                            <ProfilePicture
                                profile_picture_url={
                                    this.state.profile_picture_url
                                }
                                onImgClick={this.onProfileClick}
                                type={"header"}
                            />
                        </header>
                        <div id="buttons">
                            <Link to="/findPeople">
                                <button id="logoutButton">
                                    Find you fish!
                                </button>
                            </Link>
                            <button id="logoutButton" onClick={this.logout}>
                                Log out!
                            </button>
                        </div>
                        <main className="container">
                            <Route path="/findPeople">
                                <FindPeople
                                    path="/findPeople"
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    profile_picture_url={
                                        this.state.profile_picture_url
                                    }
                                    id={this.state.id}
                                />
                            </Route>
                            <Route path="/" exact>
                                <Profile
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    bio={this.state.bio}
                                    profile_picture_url={
                                        this.state.profile_picture_url
                                    }
                                    onUpload={this.onUpload}
                                    closeModal={this.closeModal}
                                    onProfileClick={this.onProfileClick}
                                    showModal={this.showModal}
                                    onBioUpdate={this.onBioUpdate}
                                />
                            </Route>
                            <Route path="/user/:otherUserId">
                                <OtherProfile />
                            </Route>
                        </main>
                        <footer> &#9875; Bul-bul 2022</footer>
                        {this.state.showModal && (
                            <UploadPictureModal
                                closeModal={this.closeModal}
                                onUpload={this.onUpload}
                            />
                        )}
                    </div>
                </BrowserRouter>
            )
        );
    }
}
