import api from "./api";

const uniService = {
    getAllUniversities: async () => {
        const resp = await api.get('uni/all');
        return resp.data;
    },

    getUniversityUnifo: async ({id}: {id: number}) => {
        const resp = await api.get(`uni/${id}`);
        return resp.data;
    }
}

export default uniService;