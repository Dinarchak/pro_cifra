import api from "./api";
import { AddCourse } from "../models/course";

const courseService = {
    getAllCourses: async () => {
        const resp = await api.get('/secured/allCourse');
        return resp.data;
    },

    getAllCoursesByUser: async () => {
        const resp = await api.get('/secured/allCourseByUser');
        return resp.data;
    },

    addCourse: async (data: AddCourse) => {
        const resp = await api.post('/addCourse/')
    }
}

export default courseService