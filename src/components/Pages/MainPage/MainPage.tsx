import styles from "./.module.css";
import { useEffect, useState } from "react";
import Course from "../../../models/course";
import courseService from "../../../services/courseService";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import CourseCardList from "../../Widgets/CourseCardList/CourseCardList";

export default function MainPage() {

    return <CourseCardList request={courseService.getAllCourses}/>;
}

