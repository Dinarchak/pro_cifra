import userShownFieldNames from "./constants";

import ObjectFields from "../../Dummies/ObjectFields/ObjectFields";
import ObjectLabel from "../../Dummies/ObjectLabel/ObjectLabel";
import CourseForm from "../../Widgets/CreateCourseForm/CreateCourseFrom";
import Button from "../../UI/Button/Button";
import CourseCardList from "../../Widgets/CourseCardList/CourseCardList";

import { useEffect , useState } from "react";
import userService from "../../../services/userService";
import { useAuth } from "../../../provider/authProvider";

import User from "../../../models/user";
import courseService from "../../../services/courseService";
import Course from "../../../models/course";

export default function UserHomePage() {

    const [user, setUser] = useState<User>({email: "", fullname: "", role: null, university: null});
    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    const token = useAuth();

    useEffect(() => {
      const loadData = async () => {
        try {
          const data = await userService.getUser();
          setUser(data);

          if (user.role === 'mentor') {
            const coursesList_ = await courseService.getAllCoursesByUser();
            setCoursesList(coursesList_);
          }

        } catch (error) {
          console.error("Ошибка при загрузке");
        }
      };
    
      loadData();
    });


    return (
        <>
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