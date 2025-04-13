import userShownFieldNames from "./constants";
import { roles } from "./constants";

import ObjectFields from "../../Dummies/ObjectFields/ObjectFields";
import ObjectLabel from "../../Dummies/ObjectLabel/ObjectLabel";

import { useCallback , useState } from "react";
import userService from "../../../services/userService";
import { useAuth } from "../../../provider/authProvider";

import User from "../../../models/user";
import courseService from "../../../services/courseService";
import Course from "../../../models/course";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import Avatar from "../../UI/Avatar/avatar";
import CardList from "../../Widgets/CardList/CardList";

import { useParams } from "react-router";
import usePooling from "../../../hooks/usePooling";

import style from "./.module.css";

export default function UserPage() {
    const id = Number(useParams().id)

    const [user, setUser] = useState<User>({email: "", fullname: "", role: null, university: null, id: -1});
    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    const [avatar, setAvatarBlob] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const token = useAuth();

    const fetchData = useCallback(async () => {
      const data = await userService.getUserById(id);
      setUser(data);

      const avatar_ = await userService.getUserAvatar(user.id);
      setAvatarBlob(avatar_);
      if (user.role !== null) {
        user.role = roles[user.role];
        const coursesList_ = await courseService.getAllCourses();
        setCoursesList(coursesList_);
      }
    }, []);

    usePooling(60000, fetchData);

    return <>
        <div className={style.userInfo}>
            <div className={style.userHeader}>
              <Avatar size={5} blob={avatar}/>
              <ObjectLabel label={user.fullname}/>
            </div>
            <div>
              <ObjectFields dataNames={userShownFieldNames} dataValues={{
                fullname: user.fullname,
                email: user.email,
                role: user.role !== null ? roles[user.role] : null,
                university: user.university
                }}/>
            </div>
        </div>

        {user.role !== null ? <>
            <div className={style.coursesList}>
            <h3>Курируемые программы</h3>
              {coursesList.length == 0 ?  <p style={{textAlign: 'center', color: 'var(--color-muted)'}}>Здесь пока ничего нет</p> : <CardList<Course> list={coursesList} Card={CourseCard}/>}
            </div>   
        </> : <></>}
    </>
}