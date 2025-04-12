import api from "./api";

const uniService = {
    getAllUniversities: async () => {
        const resp = await api.get('uni/all');
        return resp.data;
    },

    getUniversityInfo: async (id: number) => {
        const resp = await api.get(`uni/${id}`);
        return resp.data;
    },

    getUniversityAvatar: async (id: number) => {
        const resp = await api.get(`photo/university/avatar/${id}`, {responseType: 'blob'});
        return resp.data;
    },

    getUniversityBackground: async (id: number) => {
        const resp = await api.get(`photo/university/header/${id}`, {responseType: 'blob'});
        return resp.data
    }
}

export default uniService;