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

import Modal from 'react-bootstrap/Modal';

import style from "./.module.css"
import plus from "../../../static/add_24dp_111827_FILL0_wght400_GRAD0_opsz24.svg"


export default function UserHomePage() {

    const [user, setUser] = useState<User>({email: "", fullname: "", role: null, university: null, id: -1});
    const [coursesList, setCoursesList] = useState<Array<Course>>([]);
    const [avatar, setAvatarBlob] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
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
          <div className={style.userInfo}>
            <div className={style.userHeader}>
              <Avatar size={5} blob={avatar}/>
              <ObjectLabel label={user.fullname}/>
            </div>
            <div>
              <ObjectFields dataNames={userShownFieldNames} dataValues={user}/>
            </div>
          </div>
          {user.role === 'mentor' ? 
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Создание программы межвузового обмена</Modal.Title>
              </Modal.Header>
              <Modal.Body><CourseForm/></Modal.Body>
            </Modal>

            

            <div className={style.coursesList}>
              <button className={style.addCourseBtn} onClick={handleShow}><img src={plus}/></button>
              {coursesList.length == 0 ?  <p style={{textAlign: 'center', color: 'var(--color-muted)'}}>Здесь пока ничего нет</p> : <CardList<Course> list={coursesList} Card={CourseCard}/>}
            </div>
          </>
          : <></>}
        
          <Button callback={(e) => token.setToken(null)}>Выйти</Button>
        </>
    );
}