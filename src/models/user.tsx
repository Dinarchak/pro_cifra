type User = {
    id: number,
    fullname: string,
    email: string,
    role: string | null,
    university?: string | null
};

export default User;