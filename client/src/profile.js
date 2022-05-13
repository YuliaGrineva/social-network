import ProfilePicture from "./profilePicture";
import BioEditor from "./bioEditor";


export default function Profile(props) {
    console.log("PROPS", props);
    //     props:
    //         // the user info needed to be displayed
    //         // a function to be called when the bio is updated
    //     }
    //  {
    return (
        <section>
            <h2>Your profile</h2>
            <div id="profile">
                <ProfilePicture
                    profile_picture_url={props.profile_picture_url}
                    type={"main"}
                />

                <h3 id="profileName">
                    {props.firstname} {props.lastname}
                </h3>

                <BioEditor
                    onBioUpdate={props.onBioUpdate}
                    bio={props.bio}
                />
            </div>
        </section>
    );
}
