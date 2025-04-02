import AuthData from "../models/auth";
import api from "./api";

const authService = {
    login: async (data: AuthData) => {
        const response  = await api.get('/auth/signin', {params: data});
        return await response.data;
    },

    register: async (data: AuthData) => {
        const response = await api.post('/auth/signup', data)
        return await response.data;
    }
}

export default authService;