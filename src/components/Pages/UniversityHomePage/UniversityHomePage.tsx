import { useParams } from "react-router";
import styles from "./.module.css";
import CardList from "../../Widgets/CardList/CardList";
import Avatar from "../../UI/Avatar/avatar";
import { useState, useEffect, useMemo } from "react";
import Course from "../../../models/course";
import courseService from "../../../services/courseService";
import UserProfileLink from "../../Dummies/UserProfileLink/UserProfileLink";
import FilterInput from "../../Widgets/Filter/FilterInput";
import CourseCard from "../../Dummies/CourseCard/CourseCard";

export default function UniversityHomePage() {
    const {id} = {id : Number(useParams())};
    const [filter, setFilter] = useState("");

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

    const filteredCards = useMemo(() => {
        const res = coursesList.filter(course => course.major.toLowerCase().includes(filter.toLowerCase()))
        return res
    }, [filter, coursesList]);

    const mentors = [
        {
            name: "Владимир В.В.",
            key: 1,
            email: "mail@gmail.com"
        },
        {
            name: "Владимир В.В.",
            key: 2,
            email: "mail@gmail.com"
        },
        {
            name: "Владимир В.В.",
            key: 3,
            email: "mail@gmail.com"
        },
        {
            name: "Владимир В.В.",
            key: 4,
            email: "mail@gmail.com"
        }
    ]

    return(<>
        <div className={styles.subHeader}>
            <div className={styles.coverImage}>
                <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F03%2FSunset-wallpaper-desktop.jpg&f=1&nofb=1&ipt=8bf9c6cec789588f255e1b66174450713a52e2f1cdfc3cc94da334e4dc2b4727"/>
            </div>
            <div className={styles.UniversityTitle}>
                <div className={styles.UniversityAvatar}>
                <Avatar size={6} image_path="https://patykids.ru/wp-content/uploads/260-estetichnyh-avatarok-tolko-samye-krasivye-00522bb.jpg"/>
                </div>
                <p className={styles.UniversityName}>ИТМО</p>
            </div>
            {/*возможно удалю компонент для тайтла объекта*/}
        </div>

        <div className={styles.lists}>
            <div className={styles.filters}>
                <FilterInput filter={filter} onFilterChange={setFilter} placeholder="Поиск..."/>
            </div>
            <div className={styles.courses}>
                <CardList<Course> list={filteredCards} Card={CourseCard}/>
            </div>
            <div className={styles.mentors}>
                {mentors.map((mentor) => {
                    return <div key={mentor.key}>
                        <UserProfileLink id={mentor.key} name={mentor.name} email={mentor.email}/>
                    </div>
                })}
            </div>
        </div>
    </>);
}