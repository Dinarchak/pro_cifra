import styles from "./.module.css";
import { useEffect, useState } from "react";
import Course from "../../../models/course";
import courseService from "../../../services/courseService";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import CourseCardList from "../../Widgets/CourseCardList/CourseCardList";

export default function MainPage() {

    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
              const coursesList_ = await courseService.getAllCourses();
              setCoursesList(coursesList_);
            } catch (error) {
              console.error("Ошибка при загрузке");
            }
          };
        
          loadData();
    });

    return <CourseCardList list={coursesList}/>;
}

