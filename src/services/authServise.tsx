import api from "./api";

interface AuthData {
    email: string;
    password: string;
}

const authService = {
    login: async (data: AuthData) => {
        const response  = await api.get('/auth/login', {params: data});
        /*
            что-то делаем
        */
    },

    register: async (data: AuthData) => {
        const response = await api.post('/auth/', data)
        /*
            что-то делаем
        */
    }
}

export default authService
