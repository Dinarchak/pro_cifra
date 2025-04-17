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

    getAllCoursesByUserId: async (id: number) => {
        const resp = await api.get(`/course/courseByIdUser/${id}`);
        return resp.data;
    },

    addCourse: async (data: AddCourse) => {
        const resp = await api.post('/course/addCourse', data);
    },

    getCourseById: async (id: number) => {
        const resp = await api.get(`/course/courseById/${id}`);
        return resp.data;
    },

    deleteCourse: async (id: number ) => {
        const resp = await api.delete(`/course/deleteCourseById/${id}`);
        return resp.data;
    }
}

export default courseService