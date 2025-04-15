import { useCallback, useState } from "react";
import usePooling from "../../../hooks/usePooling";
import User from "../../../models/user";
import Avatar from "../../UI/Avatar/avatar";
import userService from "../../../services/userService";
import styles from "./.module.css"
import plus from "../../../static/add.svg"
import mentorService from "../../../services/mentorService";
import default_avatar from "../../../static/user-svgrepo-com.svg";


export default function UserToMentorCard({user}: {user: User}) {

    const [avatar, setAvatarBlob] = useState<Blob>();

    const fetchData = useCallback(async () => {
        setAvatarBlob(await userService.getUserAvatar(user.id))
    }, [user.id])

    usePooling(10000, fetchData)

    return <div className={styles.container}>
        <div className={styles.label}>
            <Avatar size={3} blob={avatar} enabled={false} default_avatar={default_avatar}/>
            <p>{user.fullname}</p>
        </div>
        <button className={styles.doMentorBtn} onClick={async (e) => {
            console.log("click")
            await mentorService.setUserAsMentor(user.id)}}><img src={plus}/></button>
    </div>
}