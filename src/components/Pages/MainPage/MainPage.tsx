import { useCallback, useMemo, useState } from "react";
import Course from "../../../models/course";
import courseService from "../../../services/courseService";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import CardList from "../../Widgets/CardList/CardList";
import styles from "./.module.css";
import CourseCardListFilter from "../../Widgets/CourseCardListFilter/CourseCardFilter";
import usePooling from "../../../hooks/usePooling";


export default function MainPage() {

    const [courseNameFilter, setCourseNameFilter] = useState("");
    const [courseMinScoreFilter, setCourseMinScoreFilter] = useState("0");
    const [courseUniFilter, setCourseUniFilter] = useState("");
    const [courseCodeFitler, setCourseCodeFilter] = useState("");

    const [coursesList, setCoursesList] = useState<Array<Course>>([]);

    const fetchData = useCallback(async () => {
      const coursesList_ = await courseService.getAllCourses();
      setCoursesList(coursesList_);
    }, []);

    usePooling(60000, fetchData);

    const fitleredList = useMemo(() => {
      return coursesList.filter((course) => {
        return (
          course.major.toLowerCase().includes(courseNameFilter.toLowerCase()) &&
          course.university.toLowerCase().includes(courseUniFilter.toLowerCase()) &&
          course.coursecode.toLowerCase().includes(courseCodeFitler.toLowerCase()) &&
          course.minscore <= Number(courseMinScoreFilter)
        );})
    }, [coursesList, courseNameFilter, courseMinScoreFilter, courseUniFilter, courseCodeFitler])

    return <div className={styles.container}>
        <CourseCardListFilter
        name={courseNameFilter}
        minscore={courseMinScoreFilter}
        uni={courseUniFilter}
        code={courseCodeFitler}
        onNameChange={setCourseNameFilter}
        onMinScoreChange={setCourseMinScoreFilter}
        onUniChange={setCourseUniFilter}
        onCodeChange={setCourseCodeFilter}/>
        <CardList<Course> list={fitleredList} Card={CourseCard}/>
      </div>;
}

