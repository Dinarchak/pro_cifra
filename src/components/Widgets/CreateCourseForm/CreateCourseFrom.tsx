import styles from "./.module.css";
import { useState } from "react";
import courseService from "../../../services/courseService";

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

            {/* University */}
            <div>
                <label htmlFor="university" className={styles.label}>
                    Университет
                </label>
                <input
                type="text"
                id="university"
                name="university"
                className={styles.input}
                onChange={(e) => {setUniversity(e.target.value)}}/>
            </div>

            {/* Major */}
            <div>
                <label htmlFor="major" className={styles.label}>
                    Специальность
                </label>
                <input
                type="text"
                id="major"
                name="major"
                className={styles.input}
                onChange={(e) => {setMajor(e.target.value)}}/>
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className={styles.label}>
                    Описание
                </label>
                <textarea
                id="description"
                name="description"
                rows={4}
                className={`${styles.input} ${styles.textarea}`}
                onChange={(e) => {setDesc(e.target.value)}}/>
            </div>

            {/* Requirement */}
            <div>
                <label htmlFor="requirement" className={styles.label}>
                    Требования
                </label>
                <textarea
                    id="requirement"
                    name="requirement"
                    rows={3}
                    className={`${styles.input} ${styles.textarea}`}
                    onChange={(e) => {setRequirements(e.target.value)}}
                />
            </div>

            {/* Submit */}
            <div className={styles.submitWrapper}>
                <button type="button" className={styles.submitButton} onClick={submit}>
                    Создать программу
                </button>
            </div>
        </form>
    );
}
