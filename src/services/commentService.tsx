import api from "./api";

type sendCommentType = {
    comment: string,
    idcourse: number,
    iduser: number,
    idanswerto: number | null
};


const commentService = {
    sendComment: async (body: sendCommentType) => {
        const resp = await api.post('/comment/addComment', body);
        return resp.data;
    },

    getAllComments: async (courseId: number) => {
        const resp = await api.get('/comment/allCommentByIdCourse', {params: {idcourse: courseId}});
        return resp.data;
    }
}

export default commentService;