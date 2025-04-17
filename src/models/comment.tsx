type Comment = {
    id: number;
    comment: string;
    idanswerto: number | null;
    iduser: number;
    idcourse: number;
}

export default Comment;