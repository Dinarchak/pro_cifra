import { useContext, createContext, useState, useEffect, useMemo} from "react";
import api from "../services/api";
import { AuthContextType } from "../models/auth";

const AuthContext = createContext<AuthContextType>({token: null, setToken: () => {return;}});



const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken_] = useState<string | null>(localStorage.getItem('token') ?? null);

    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorage.setItem('token', token);
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

