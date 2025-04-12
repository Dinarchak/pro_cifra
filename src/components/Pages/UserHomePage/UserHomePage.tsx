import userShownFieldNames from "./constants";

import ObjectFields from "../../Dummies/ObjectFields/ObjectFields";
import ObjectLabel from "../../Dummies/ObjectLabel/ObjectLabel";
import CourseForm from "../../Widgets/CreateCourseForm/CreateCourseFrom";
import Button from "../../UI/Button/Button";

import { useEffect , useState } from "react";
import userService from "../../../services/userService";
import { useAuth } from "../../../provider/authProvider";

import User from "../../../models/user";
import courseService from "../../../services/courseService";
import Course from "../../../models/course";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import Avatar from "../../UI/Avatar/avatar";
import CardList from "../../Widgets/CardList/CardList";


export default function UserHomePage() {

    const [user, setUser] = useState<User>({email: "", fullname: "", role: null, university: null, id: -1});
    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    const [avatar, setAvatarBlob] = useState();
    const token = useAuth();

    useEffect(() => {
      const loadData = async () => {
        try {
          const data = await userService.getUser();
          setUser(data);

          const avatar_ = await userService.getUserAvatar(user.id);
          setAvatarBlob(avatar_);

          if (user.role === 'mentor') {
            const coursesList_ = await courseService.getAllCoursesByUser();
            setCoursesList(coursesList_);
          }

        } catch (error) {
          console.error("Ошибка при загрузке", error);
        }
      };
    
      loadData();
    });


    return (
        <>
          <Avatar size={4} blob={avatar}/>
          <ObjectLabel label={user.fullname}/>
          <div>
            <ObjectFields dataNames={userShownFieldNames} dataValues={user}/>
          </div>
          {user.role === 'mentor' ? 
          <>
            <CourseForm/>
            <CardList<Course> list={coursesList} Card={CourseCard}/>
          </>
          : <></>}
        
          <Button callback={(e) => token.setToken(null)}>Выйти</Button>
        </>
    );
}