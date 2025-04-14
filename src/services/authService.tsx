import LoginData, { RegisterData } from "../models/auth";
import api from "./api";

const authService = {
    login: async (data: LoginData) => {
        const response  = await api.post('/auth/signin', data);
        return await response.data;
    },

    register: async (data: RegisterData) => {
        const response = await api.post('/auth/signup', data)
        return await response.data;
    }
}

export default authService;