import ProfilePicture from "./profilePicture";
import BioEditor from "./bioeditor";


export default function Profile(props) {
    return (
        <section>
            <h3>Your profile</h3>
            <div id="profile">
                <div id="picname">
                    <ProfilePicture
                        profile_picture_url={props.profile_picture_url}
                        type={"main"}
                    />

                    <h3 id="profileName">
                        {props.firstname} {props.lastname}
                    </h3>
                </div>
                <BioEditor onBioUpdate={props.onBioUpdate} bio={props.bio} />
            </div>
        </section>
    );
}
