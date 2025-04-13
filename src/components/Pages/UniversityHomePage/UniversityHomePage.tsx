import { useParams } from "react-router";
import styles from "./.module.css";
import CardList from "../../Widgets/CardList/CardList";
import Avatar from "../../UI/Avatar/avatar";
import { useState, useCallback, useMemo } from "react";
import Course from "../../../models/course";
import uniService from "../../../services/uniService";
import UserProfileLink from "../../Dummies/UserProfileLink/UserProfileLink";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import User from "../../../models/user";
import CourseCardListFilter from "../../Widgets/CourseCardListFilter/CourseCardFilter";
import usePooling from "../../../hooks/usePooling";

export default function UniversityHomePage() {
    const id = Number(useParams().id);

    const [courseNameFilter, setCourseNameFilter] = useState("");
    const [courseMinScoreFilter, setCourseMinScoreFilter] = useState("0");
    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    const [mentors, setMentors] = useState<Array<User>>([]);
    const [uniName, setUniName] = useState("");
    const [avatar, setAvatarBlob] = useState();
    const [background, setBackgroundURL] = useState("");

    const fetchData = useCallback(async () => {
        const uni = await uniService.getUniversityInfo(id);
        const avatar_blob = await uniService.getUniversityAvatar(id);
        const background_blob = await uniService.getUniversityBackground(id);
        if (background_blob !== undefined)
            setBackgroundURL(URL.createObjectURL(background_blob));
        setAvatarBlob(avatar_blob);
        setCoursesList(uni.giveCourseDTOList);
        setMentors(uni.giveUserDTOList);
        setUniName(uni.university);
    }, [id]);

    usePooling(10000, fetchData);

    const filteredCards = useMemo(() => {
        const res = coursesList.filter(course => { return (
            course.major.toLowerCase().includes(courseNameFilter.toLowerCase()) &&
            course.minscore <= Number(courseMinScoreFilter)) })
        return res
    }, [courseNameFilter, courseMinScoreFilter, coursesList]);

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
                <CourseCardListFilter
                onNameChange={setCourseNameFilter}
                name={courseNameFilter}
                onMinScoreChange={setCourseMinScoreFilter}
                minscore={courseMinScoreFilter}/>
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