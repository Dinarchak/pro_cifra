import Course from "./course";
import User from "./user";

export default interface University {
    university: string,
    giveCourseDTOList: Array<Course>,
    giveUserDTOList: Array<User>
}