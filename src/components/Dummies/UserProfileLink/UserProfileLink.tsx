import { useEffect, useState } from "react";
import userService from "../../../services/userService";
import Avatar from "../../UI/Avatar/avatar";
import style from "./.module.css";
import { Link } from "react-router";
import default_avatar from "../../../static/user-svgrepo-com.svg";

type UserProfileLinkType = {
    id: number,
    name: string,
    email: string,
    avatar?: string
}

export default function UserProfileLink({id, name, email, avatar}: UserProfileLinkType) {

    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        const loadData = async () => {
            const avatar = await userService.getUserAvatar(id);
            const avatarUrl_ = URL.createObjectURL(avatar);
            setAvatarUrl(avatarUrl_);
        }
    })

    
    return <>
        <div className={style.container}>
            <Avatar size={5} image_path={avatarUrl === "" ? default_avatar : avatarUrl}/>
            <div className={style.bio}>
                <Link to={`/user/${id}`}>
                    <h3 className={style.title}>{name}</h3>
                </Link>
                <p className={style.subtitle}>{email}</p>
            </div>
        </div>
    </>;
}