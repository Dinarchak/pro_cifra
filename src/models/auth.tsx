export default interface AuthData {
    email: string;
    full_name: string;
    password: string;
}

export interface AuthContextType {
    token: string | null;
    setToken: (newToken: string) => void;
}