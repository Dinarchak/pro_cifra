import { useState, useEffect, ReactNode } from "react";
import Course from "../../../models/course";
import courseService from "../../../services/courseService";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import styles from "./.module.css";

type CardListType<T extends {id: number}> = {
    list: Array<T>,
    Card: React.ComponentType<{obj: T}>;
}

export default function CardList<T extends {id: number}>({list, Card}: CardListType<T>) {

    const coursesList = list.map(obj => <>
        <li key={obj.id} className={styles.courseCard}>
            <Card obj={obj}/>
        </li>
    </>)

    return (<>
        <ul className={styles.list}>
            {coursesList}
        </ul>
    </>);
}