import Course from "../../../models/course";
import styles from "./.module.css";

import ObjectFields from "../ObjectFields/ObjectFields";
import ProgramCardFieldNames from "./constants"

type CourseCardType = {
    obj: Course;
}

export default function CourseCard({obj}: CourseCardType) {
    return (<>
        <div className={styles.card + " bodyText"}>
            <ObjectFields dataValues={obj} dataNames={ProgramCardFieldNames}/>
        </div>
    </>);
}