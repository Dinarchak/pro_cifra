import styles from "./.module.css";
import { useState } from "react";
import courseService from "../../../services/courseService";
import FormInput from "../../UI/FormInput/Input";
import FormTextarea from "../../UI/FormTextArea/FormTextArea";

export default function CourseForm() {

    const [description, setDesc] = useState("");
    const [university, setUniversity] = useState("");
    const [major, setMajor] = useState("");
    const [requirement, setRequirements] = useState("");

    const submit = () => {
        try {
            const resp = courseService.addCourse({
                major: major,
                university: university,
                requirement: requirement,
                description: description
            })
            console.log("Запрос принят.");
        } catch {
            console.log("Ошибка. Запрос отклонен.");
        }
        
    }

    return (
        <form className={styles.form}>
            <h2 className={styles.title}>Создание программы межвузового обмена</h2>

            <FormInput label="Университет" callback={setUniversity} type="text"/>
            <FormInput label="Специальность" callback={setMajor} type="text"/>
            <FormTextarea label="Описание" callback={setDesc}/>
            <FormTextarea label="Требования" callback={setRequirements}/>
            
            {/* Submit */}
            <div className={styles.submitWrapper}>
                <button type="button" className={styles.button} onClick={submit}>
                    Создать программу
                </button>
            </div>
        </form>
    );
}
