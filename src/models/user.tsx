type User = {
    id: number;
    fullname: string;
    email: string;
    role: string | null;
    university: string | null;
};

type UserWithAvatar = User & {
    avatar?: Blob;
};


export default User;
export type { UserWithAvatar };