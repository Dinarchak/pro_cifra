import api from "./api";
import User from "../models/user";

const userService = {
    getUser: async(id: number) => {
        const resp = api.get('url', {params: {id: id}})
        /*
            что-то делаем
        */
    }
};

export default userService;