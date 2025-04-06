export interface RegisterData {
    email: string;
    fullname: string;
    password: string;
    name: string;
    university: string;
}

export default interface LoginData {
    name: string;
    password: string;
}

export interface AuthContextType {
    token: string | null;
    setToken: (newToken: string | null) => void;
}