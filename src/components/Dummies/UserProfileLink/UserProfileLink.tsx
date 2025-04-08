import style from "./.module.css";
import { Link } from "react-router";

type UserProfileLinkType = {
    id: number,
    name: string,
    email: string,
    avatar?: string
}

export default function UserProfileLink({id, name, email, avatar}: UserProfileLinkType) {
    return <>
        <div className={style.container}>
            <Link to={`/user/${id}`}>
                <h3 className={style.title}>{name}</h3>
            </Link>
            <p className={style.subtitle}>{email}</p>
        </div>
    </>;
}