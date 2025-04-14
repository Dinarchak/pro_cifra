import userService from "../../../services/userService";
import { useState, useEffect } from "react";
import FormInput from "../../UI/FormInput/Input";

export default function AddMentorForm() {
    const [fullname, setFullname] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                if (fullname.length) {
                    const data = userService.getUsersByFullname(fullname);
                }
            } catch(error) {
                console.error('Ошибка загрзуки', error);
            }
            
        }

        loadData();
    }, [fullname]);

    return <FormInput value={fullname} callback={setFullname} type="text" placeholder="Введите ФИО"/>
}