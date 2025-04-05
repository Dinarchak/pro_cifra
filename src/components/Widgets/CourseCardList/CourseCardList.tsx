import { useState, useEffect } from "react";
import Course from "../../../models/course";
import courseService from "../../../services/courseService";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import styles from "./.module.css";

type CourseCardListType = {
    request: () => Promise<any>;
}

export default function CourseCardList({request}: CourseCardListType) {

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