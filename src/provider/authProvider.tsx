import { useContext, createContext, useState, useEffect, useMemo, useCallback} from "react";
import api from "../services/api";
import { AuthContextType } from "../models/auth";
import User from "../models/user";
import userService from "../services/userService";
import usePooling from "../hooks/usePooling";

const AuthContext = createContext<AuthContextType>({token: null, setToken: () => {return;}, user: null});

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken_] = useState<string | null>(localStorage.getItem('token') ?? null);
    const [user, setUser] = useState<User | null>(null);

    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            userService.getUser().then(resp => setUser(resp));
            localStorage.setItem('token', token);
        } else {
            delete api.defaults.headers.common['Authorization'];
            setUser(null);
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
          token,
          setToken,
          user
        }),
        [token]
      );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );

};


export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

