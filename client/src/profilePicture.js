export default function ProfilePicture(props) {
    console.log("ProfilePicture props", props);
    if (!props.profile_picture_url) {
        return (
            <img
                src="/avatar.jpeg"
                className={`profile-pic ${props.type}`}
                onClick={props.onImgClick}
            />
        );
    }
    return (
        <img
            src={props.profile_picture_url}
            onClick={props.onImgClick}
            className ={`profile-pic ${props.type}`}
            placeholder="Profilpic"
        
        />
    );
}
