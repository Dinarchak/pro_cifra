import api from "./api";

type setUniImgType = {
    uni_id: number,
    file: File
}

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
    },

    setUniAvatar: async({uni_id, file}: setUniImgType) => {
        const form = new FormData();
        form.append('file', file)

        const resp = await api.post(`photo/setUniversityAvatar/${uni_id}`, form, {headers: {
            "Content-Type": "multipart/form-data"
        }})
        return resp.data;
    },

    setUniBackground: async({uni_id, file}: setUniImgType) => {
        const form = new FormData();
        form.append('file', file)

        const resp = await api.post(`photo/setUniversityHeader/${uni_id}`, form, {headers: {
            "Content-Type": "multipart/form-data"
        }})
        return resp.data;
    }
}

export default uniService;