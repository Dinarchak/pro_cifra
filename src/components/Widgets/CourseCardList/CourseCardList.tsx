import { useState, useEffect, ReactNode } from "react";
import Course from "../../../models/course";
import courseService from "../../../services/courseService";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import styles from "./.module.css";

type CourseCardListType = {
    list: Array<Course>;
}

export default function CourseCardList({list}: CourseCardListType) {

    const coursesList = list.map(course => <>
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