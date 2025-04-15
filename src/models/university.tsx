import Course from "./course";
import User from "./user";

export default interface University {
    id: number,
    university: string,
    giveCourseDTOList: Array<Course>,
    mentorList: Array<User>
}