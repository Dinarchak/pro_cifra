import { useCallback, useState } from "react";
import usePooling from "../../../hooks/usePooling";
import User from "../../../models/user";
import Avatar from "../../Widgets/Avatar/avatar";
import userService from "../../../services/userService";
import styles from "./.module.css"
import plus from "../../../static/add.svg"
import mentorService from "../../../services/mentorService";
import default_avatar from "../../../static/user-svgrepo-com.svg";

type UserToMentorCardType = {
    user: User,
    callback?: () => Promise<void>
}

export default function UserToMentorCard(props: UserToMentorCardType) {

    const [avatar, setAvatarBlob] = useState<Blob>();

    const default_callback = async () => {
        await mentorService.setUserAsMentor(props.user.id)
    }

    const fetchData = useCallback(async () => {
        setAvatarBlob(await userService.getUserAvatar(props.user.id))
    }, [props.user.id])

    usePooling(10000, fetchData)

    return <div className={styles.container}>
        <div className={styles.label}>
            <Avatar size={3} blob={avatar} enabled={false} default_avatar={default_avatar}/>
            <p>{props.user.fullname}</p>
        </div>
        <button className={styles.doMentorBtn} onClick={props.callback ? props.callback : default_callback}><img src={plus}/></button>
    </div>
}