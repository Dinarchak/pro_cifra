import Course from "../../../models/course";
import styles from "./.module.css";
import bin from "../../../static/delete.svg"
import ObjectFields from "../ObjectFields/ObjectFields";
import ProgramCardFieldNames from "./constants"
import { textMaxLength } from "./constants";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import courseService from "../../../services/courseService";

type CourseCardType = {
    obj: Course;
    candelete?: boolean
}

export default function CourseCard({obj, candelete=false}: CourseCardType) {
    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false)};
    const handleShow = () => {setShow(true)};

    const objCopy = {...obj};
    if (objCopy.description.length > textMaxLength) {
        objCopy.description = objCopy.description.slice(0, textMaxLength) + "...";
    }

    if (objCopy.requirement.length > textMaxLength) {
        objCopy.requirement = objCopy.requirement.slice(0, textMaxLength) + "...";
    }
    return (<>
        <div className={styles.card + " bodyText"}>
            <Link to={`/course/${objCopy.id}`}><h3 className={styles.cardName}>{objCopy.major}</h3></Link>
            <ObjectFields dataValues={objCopy} dataNames={ProgramCardFieldNames}/>
            {candelete && <button onClick={handleShow} className={styles.deleteBtn}><img src={bin}/></button>}
        </div>

        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Удаление программы обмена</Modal.Title>
              </Modal.Header>
              <Modal.Body>Вы точно хотите удалить программу обмена?</Modal.Body>
              <Modal.Footer>
                <Button onClick={async () => {
                    await courseService.deleteCourse(obj.id);
                    handleClose();
                }}>Да</Button>
                <Button onClick={handleClose}>Нет</Button>
              </Modal.Footer>
        </Modal> : <></>

    </>);
}