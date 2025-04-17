import Course from "../../../models/course";
import styles from "./.module.css";

import ObjectFields from "../ObjectFields/ObjectFields";
import ProgramCardFieldNames from "./constants"
import { textMaxLength } from "./constants";
import { Link } from "react-router-dom";

type CourseCardType = {
    obj: Course;
}

export default function CourseCard({obj}: CourseCardType) {
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
        </div>
    </>);
}