export default function ProfilePicture(props) {
    console.log("ProfilePicture props", props);
    if (!props.profile_picture_url) {
        return (
            <img
                src="/avatar.jpeg"
                height="50px"
                width="50px"
                onClick={props.onImgClick}
            />
        );
    }
    return (
        <img
            src={props.profile_picture_url}
            onClick={props.onImgClick}
            placeholder="Profilpic"
            height="50px"
            width="50px"
        />
    );
}
