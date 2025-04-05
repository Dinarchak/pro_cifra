import styles from "./.module.css";
import { useEffect, useState } from "react";
import Course from "../../../models/course";
import courseService from "../../../services/courseService";
import CourseCard from "../../Dummies/CourseCard/CourseCard";

export default function MainPage() {

    const [data, setData] = useState<Array<Course>>([]);
    useEffect(() => {
        const loadData = async () => {
            const data = await courseService.getAllCourses();
            setData(data);
        }
        loadData();
    })

    const coursesList = data.map(course => <>
        <li key={course.id} className={styles.courseCard}>
            <CourseCard course={course}/>
        </li>
    </>)

    return (<>
        <ul>
            {coursesList}
        </ul>
    </>);
}

