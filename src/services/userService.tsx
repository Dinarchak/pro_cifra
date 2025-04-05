import api from "./api";

const userService = {
    getUser: async() => {
        const resp = await api.get('/user/getAllAboutUser');
        return resp.data;
    }
};

export default userService;