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
    },
    getUsersByFullname: async(fullname: string) => {
        const resp = await api.get(`user/getByString`, {params: {user: fullname}});
        console.log(resp.data);

        return resp;
    }
};

export default userService;