export default function ProfilePicture(props) {
    console.log("ProfilePicture props", props);

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

    // if (!props.profile_picture_url) {
    //     // const profile_picture_url = "/icon.jpeg";
    //     return (
    //         <img
    //             // src={profile_picture_url : "/icon.jpeg"}
    //             src="/icon.jpeg"
    //             className={`profile-pic ${props.type}`}
    //             onClick={props.onImgClick}
    //         />
    //     );
    // }
    // return (
    //     <img
    //         src={props.profile_picture_url}
    //         onClick={props.onImgClick}
    //         className={`profile-pic ${props.type}`}
    //         placeholder="Profilpic"
    //     />
    // );
}
