import api from "./api";

const userService = {
    getUser: async() => {
        const resp = await api.get('/user/getAllAboutUser');
        return resp.data;
    },

    getUserAvatar: async(id: number) => {
        const resp = await api.get(`/photo/user/${id}`, {responseType: 'blob'});
        return resp.data;
    },

    getUserById: async(id: number) => {
        const resp = await api.get(`user/${id}`)
        return resp.data;
    }
};

export default userService;