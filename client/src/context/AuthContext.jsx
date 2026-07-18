import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {

            const { data } = await api.get("/users/profile");

            setUser(data.user);

        } catch (error) {

            localStorage.removeItem("token");
            setUser(null);

        } finally {

            setLoading(false);

        }
    };

    const login = (token, userData) => {

        localStorage.setItem("token", token);

        setUser(userData);

    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                setUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => {

    return useContext(AuthContext);

};