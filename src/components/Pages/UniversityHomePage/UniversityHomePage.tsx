import { useParams } from "react-router";
import styles from "./.module.css";
import CardList from "../../Widgets/CardList/CardList";
import Avatar from "../../UI/Avatar/avatar";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import Course from "../../../models/course";
import uniService from "../../../services/uniService";
import UserProfileLink from "../../Dummies/UserProfileLink/UserProfileLink";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import User from "../../../models/user";
import CourseCardListFilter from "../../Widgets/CourseCardListFilter/CourseCardFilter";
import usePooling from "../../../hooks/usePooling";
import { useAuth } from "../../../provider/authProvider";
import userService from "../../../services/userService";
import upload from "../../../static/upload_file.svg";


export default function UniversityHomePage() {
    const id = Number(useParams().id);
    const token = useAuth();

    const [courseNameFilter, setCourseNameFilter] = useState("");
    const [courseMinScoreFilter, setCourseMinScoreFilter] = useState("0");
    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    const [mentors, setMentors] = useState<Array<User>>([]);
    const [uniName, setUniName] = useState("");
    const [avatar, setAvatarBlob] = useState();
    const [background, setBackgroundURL] = useState("");
    const [backgroundBlob, setBackgroundBlob] = useState<Blob | null>(null);
    const [user, setUser] = useState<User>()
    const [enambleEditing, setEnableEditing] = useState(false);

    const fetchData = useCallback(async () => {
        const uni = await uniService.getUniversityInfo(id);

        setCoursesList(uni.giveCourseDTOList);
        setMentors(uni.mentorList);
        setUniName(uni.university);

        const user_ = await userService.getUser();
        setUser(user_);

        const avatar_blob = await uniService.getUniversityAvatar(id);
        setAvatarBlob(avatar_blob);

        const background_blob = await uniService.getUniversityBackground(id);
        if (background_blob !== undefined)
            setBackgroundBlob(background_blob);
    }, [id]);

    useEffect(() => {
        if (!backgroundBlob)
            return;

        const background_url = URL.createObjectURL(backgroundBlob);
        setBackgroundURL(background_url);

        return () => {
            URL.revokeObjectURL(background_url)
        }
    }, [backgroundBlob])

    useEffect(() => {
        setEnableEditing((Boolean(token.token) && user?.role === 'creator' && user.university === uniName))
    }, [token, user, uniName]);

    usePooling(10000, fetchData);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleIconClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('Выбран файл:', file);
            await uniService.setUniBackground({uni_id: id, file: file});
            setBackgroundBlob(file);
        }
      };

    const filteredCards = useMemo(() => {
        const res = coursesList.filter(course => { return (
            course.major.toLowerCase().includes(courseNameFilter.toLowerCase()) &&
            course.minscore <= Number(courseMinScoreFilter)) })
        return res
    }, [courseNameFilter, courseMinScoreFilter, coursesList]);


    return(<>
        <div className={styles.subHeader}>
            <div className={styles.coverImage}>
                <img className={enambleEditing ? styles.back : styles.constBack} src={background}/>
                {
                    enambleEditing &&
                    <>  
                        <img className={styles.changeBack} src={upload} onClick={handleIconClick}/>
                        <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}/>
                    </>
                }
            </div>
            <div className={styles.UniversityTitle}>
                <div className={styles.UniversityAvatar}>
                <Avatar size={6} blob={avatar} enabled={enambleEditing}
                updateAvatar={ async (file: File) => await uniService.setUniAvatar({uni_id: id, file: file})}
                />
                </div>
                <p className={styles.UniversityName}>{uniName}</p>
            </div>
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