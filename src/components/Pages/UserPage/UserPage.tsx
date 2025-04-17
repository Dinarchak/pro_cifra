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
import Avatar from "../../Widgets/Avatar/avatar";
import CardList from "../../Widgets/CardList/CardList";

import { useParams } from "react-router";
import usePooling from "../../../hooks/usePooling";
import default_avatar from "../../../static/user-svgrepo-com.svg"

import style from "./.module.css";

export default function UserPage() {
    const id = Number(useParams().id)

    const [user, setUser] = useState<User>({email: "", fullname: "", role: null, university: null, id: -1});
    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    const [avatar, setAvatarBlob] = useState();
    const token = useAuth();

    const fetchData = useCallback(async () => {
      const data = await userService.getUserById(id);
      setUser(data);

      const avatar_ = await userService.getUserAvatar(data.id);
      setAvatarBlob(avatar_);
      if (data.role !== null) {
        data.role = roles[data.role];
        const coursesList_ = await courseService.getAllCoursesByUserId(id);
        setCoursesList(coursesList_);

        console.log(coursesList_)
      }
    }, [id]);

    usePooling(60000, fetchData);

    return <>
        <div className={style.userInfo}>
            <div className={style.userHeader}>
              <Avatar size={5} blob={avatar} enabled={false} default_avatar={default_avatar}/>
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
          <h3 style={{margin: "30px 0 25px 0"}}>Курируемые программы</h3>
            <div className={style.coursesList}>
              <CardList<Course, any> list={coursesList} Card={CourseCard}/>
            </div>   
        </> : <></>}
    </>
}