import api from "./api";

const mentorService = {
    setUserAsMentor: async(id: number) => {
        const resp = await api.post(`user/${id}/mentor`)
        return resp.data
    }
}

export default mentorService