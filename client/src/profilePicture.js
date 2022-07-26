export default function ProfilePicture(props) {

    return (
        <img
            src={
                props.profile_picture_url
                    ? props.profile_picture_url
                    : "/icon.jpeg"
            }
            onClick={props.onImgClick}
            className={`profile-pic ${props.type}`}
            placeholder="Profilpic"
        />
    );

}
