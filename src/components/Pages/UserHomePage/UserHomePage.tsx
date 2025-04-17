import userShownFieldNames from "./constants";

import ObjectFields from "../../Dummies/ObjectFields/ObjectFields";
import ObjectLabel from "../../Dummies/ObjectLabel/ObjectLabel";
import CourseForm from "../../Widgets/CreateCourseForm/CreateCourseFrom";
import Button from "../../UI/Button/Button";

import { useCallback , useState } from "react";
import userService from "../../../services/userService";
import { useAuth } from "../../../provider/authProvider";
import usePooling from "../../../hooks/usePooling";

import User from "../../../models/user";
import courseService from "../../../services/courseService";
import Course from "../../../models/course";
import CourseCard from "../../Dummies/CourseCard/CourseCard";
import Avatar from "../../Widgets/Avatar/avatar";
import CardList from "../../Widgets/CardList/CardList";
import AddMentorForm from "../../Widgets/AddMentorForm/AddMentorForm";

import Modal from 'react-bootstrap/Modal';

import style from "./.module.css";
import plus from "../../../static/add.svg";
import add_person from "../../../static/person_add.svg";
import default_avatar from "../../../static/user-svgrepo-com.svg"



export default function UserHomePage() {

    const [user, setUser] = useState<User>({email: "", fullname: "", role: null, university: null, id: -1});
    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    const [avatar, setAvatarBlob] = useState();
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [showMentorForm, setShowMentorForm] = useState(false);

    const handleCloseCourseForm = () => setShowCourseForm(false);
    const handleShowCourseForm = () => setShowCourseForm(true);

    const handleCloseMentorForm = () => setShowMentorForm(false);
    const handleOpenMentorForm = () => setShowMentorForm(true);
  
    const token = useAuth();

    const fetchData = useCallback(async () => {
      const data = await userService.getUser();
      setUser(data);

      const avatar_ = await userService.getUserAvatar(data.id);
      setAvatarBlob(avatar_);

      if (data.role !== null) {
        const coursesList_ = await courseService.getAllCoursesByUser();
        setCoursesList(coursesList_);
      }
    }, []);

    usePooling(10000, fetchData);

    return (
        <>
          <div className={style.userInfo}>
            <div className={style.userHeader}>
              <Avatar size={5} blob={avatar} default_avatar={default_avatar} enabled={Boolean(token.token)} updateAvatar={async (file: File) => {
                  await userService.setUserAvater({user_id: user.id, file: file})
                }}/>
              <ObjectLabel label={user.fullname}/>
            </div>
            <div>
              <ObjectFields dataNames={userShownFieldNames} dataValues={user}/>
            </div>
            <div className={style.manageMenu}>
              { (user.role === "creator" || user.role === "mentor") &&
              <button className={style.addBtn} onClick={handleShowCourseForm}><img src={plus}/></button>
              }
              {
                user.role === "creator" &&
                <button className={style.addBtn} onClick={handleOpenMentorForm}><img src={add_person}/></button>
              }
            </div>
          </div>

          {user.role === "creator" ?
            <Modal show={showMentorForm} onHide={handleCloseMentorForm}>
              <Modal.Header closeButton>
                <Modal.Title>Новый куратор</Modal.Title>
              </Modal.Header>
              <Modal.Body><AddMentorForm/></Modal.Body>
            </Modal> : <></>
          }

          {user.role !== null && user.university !== null ? 
          <>
            <Modal show={showCourseForm} onHide={handleCloseCourseForm}>
              <Modal.Header closeButton>
                <Modal.Title>Создание программы межвузового обмена</Modal.Title>
              </Modal.Header>
              <Modal.Body><CourseForm university={user.university}/></Modal.Body>
            </Modal>

            <div className={style.coursesList}>
              <CardList<Course> list={coursesList} Card={CourseCard}/>
            </div>
          </>
          : <></>}
        
          <Button callback={(e) => token.setToken(null)}>Выйти</Button>
        </>
    );
}