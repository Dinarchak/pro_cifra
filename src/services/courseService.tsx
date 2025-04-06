import api from "./api";
import { AddCourse } from "../models/course";

const courseService = {
    getAllCourses: async () => {
        const resp = await api.get('/course/allCourse');
        return resp.data;
    },

    getAllCoursesByUser: async () => {
        const resp = await api.get('/course/allCourseByUser');
        return resp.data;
    },

    addCourse: async (data: AddCourse) => {
        const resp = await api.post('/course/addCourse', data);
    }
}

export default courseService