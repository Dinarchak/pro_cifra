import { useParams } from "react-router";
import styles from "./.module.css";
import CardList from "../../Widgets/CardList/CardList";
import Avatar from "../../UI/Avatar/avatar";
import { useState, useEffect, useMemo } from "react";
import Course from "../../../models/course";
import uniService from "../../../services/uniService";
import UserProfileLink from "../../Dummies/UserProfileLink/UserProfileLink";
import FilterInput from "../../Widgets/Filter/FilterInput";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import User from "../../../models/user";

export default function UniversityHomePage() {
    const id = Number(useParams().id);

    const [filter, setFilter] = useState("");
    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    const [mentors, setMentors] = useState<Array<User>>([]);
    const [uniName, setUniName] = useState("");
    const [avatar, setAvatarBlob] = useState();
    const [background, setBackgroundURL] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const uni = await uniService.getUniversityInfo(id);
                const avatar_blob = await uniService.getUniversityAvatar(id);
                const background_blob = await uniService.getUniversityBackground(id);
                if (background_blob !== undefined)
                    setBackgroundURL(URL.createObjectURL(background_blob));
                setAvatarBlob(avatar_blob);
                setCoursesList(uni.giveCourseDTOList);
                setMentors(uni.giveUserDTOList);
                setUniName(uni.university);
            } catch (error) {
                console.error("Ошибка при загрузке", error);
            }
          };
          loadData();
    });

    const filteredCards = useMemo(() => {
        const res = coursesList.filter(course => course.major.toLowerCase().includes(filter.toLowerCase()))
        return res
    }, [filter, coursesList]);

    return(<>
        <div className={styles.subHeader}>
            <div className={styles.coverImage}>
                <img src={background}/>
            </div>
            <div className={styles.UniversityTitle}>
                <div className={styles.UniversityAvatar}>
                <Avatar size={6} blob={avatar}/>
                </div>
                <p className={styles.UniversityName}>{uniName}</p>
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
                    return <div key={mentor.id}>
                        <UserProfileLink id={mentor.id} name={mentor.fullname} email={mentor.email}/>
                    </div>
                })}
            </div>
        </div>
    </>);
}