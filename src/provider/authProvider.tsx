import { useContext, createContext, useState, useEffect, useMemo} from "react";
import api from "../services/api";
import authService from "../services/authServise";
import AuthData from "../models/auth";
import { AuthContextType } from "../models/auth";

const AuthContext = createContext<AuthContextType>({token: null, setToken: () => {}});

const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState(null);
    const [token, setToken_] = useState(localStorage.getItem('token'));

    const setToken = (newToken: string) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = 'Bearer' + token;
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
          token,
          setToken,
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

