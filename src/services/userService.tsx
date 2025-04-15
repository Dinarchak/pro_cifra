import api from "./api";

type setUserAvatarType = {
    user_id: number,
    file: File
}

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
        const resp = await api.get("user/getByString", {params: {user: fullname}});

        return resp.data;
    },

    setUserAvater: async({user_id, file}: setUserAvatarType) => {
        const form = new FormData();
        form.append('file', file)

        const resp = await api.post(`photo/setUserAvatar/${user_id}`, form, {headers: {
            "Content-Type": "multipart/form-data"
        }})
        return resp.data
    }
};

export default userService;