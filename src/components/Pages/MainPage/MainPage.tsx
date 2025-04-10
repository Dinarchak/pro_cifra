import { useEffect, useState } from "react";
import Course from "../../../models/course";
import courseService from "../../../services/courseService";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import CardList from "../../Widgets/CardList/CardList";

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

    return <CardList<Course> list={coursesList} Card={CourseCard}/>;
}

