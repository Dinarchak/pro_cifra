import userService from "../../../services/userService";
import { useState, useEffect, useMemo } from "react";
import FormInput from "../../UI/FormInput/Input";
import User from "../../../models/user";
import UserToMentorCard from "../../Dummies/UserToMentorCard/UserToMentorCard";
import styles from "./.module.css";
import mentorService from "../../../services/mentorService";

export default function AddMentorForm() {
    const [fullname, setFullname] = useState("");
    const [userList, setUserList] = useState<Array<User>>([])
    const [rerender, trigger] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (fullname.length > 0) {
                    const data = await userService.getUsersByFullname(fullname);
                    setUserList(data)
                }
            } catch(error) {
                console.error('Ошибка загрзуки', error);
            }
            
        }

        loadData();
    }, [fullname, rerender]);

    const filteredList = useMemo(() => {
        return userList.filter((u) => u.role === null);
    }, [userList])

    return <>
            <FormInput value={fullname} callback={setFullname} type="text" placeholder="Введите ФИО"/>
            <ul className={styles.list}>
                {filteredList.map(item => <li key={item.id}>
                    <UserToMentorCard user={item} callback={async () => {
                        await mentorService.setUserAsMentor(item.id);
                        trigger(!rerender);
                    }}/>
                </li>)}
            </ul>
        </>
}