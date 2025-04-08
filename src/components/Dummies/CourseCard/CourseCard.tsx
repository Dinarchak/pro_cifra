import Course from "../../../models/course";
import styles from "./.module.css";

import ObjectFields from "../ObjectFields/ObjectFields";
import ProgramCardFieldNames from "./constants"

type CourseCardType = {
    course: Course;
}

export default function CourseCard({course}: CourseCardType) {
    return (<>
        <div className={styles.card + " bodyText"}>
            <ObjectFields dataValues={course} dataNames={ProgramCardFieldNames}/>
        </div>
    </>);
}