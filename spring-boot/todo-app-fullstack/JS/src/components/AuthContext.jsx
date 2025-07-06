import { createContext, useContext, useState } from "react";
import { executeBasicAuth, executeJwtAuth } from "../api/auth";
import { apiClient } from "../api/apiClient";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState(null)

    // async function login(username, password) {
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password);
        
    //     try {
    //         const response = await executeBasicAuth(baToken);

    //         if (response.status == 200) {
    //             setToken(baToken);
    //             setAuthenticated(true);
    //             setUsername(username);

    //             apiClient.interceptors.request.use((config) => {
    //                 config.headers.Authorization = baToken;
    //                 return config;
    //             })
    //             return true;
    //         } else {
    //             logout();
    //             return false;
    //         }
    //     } catch (err) {
    //         logout();
    //         return false;
    //     }
    // }

    async function login(username, password) {

        try {
            const response = await executeJwtAuth(username, password);
            
            if (response.status == 200) {
                const jwtToken = "Bearer " + response.data.token;
                setToken(jwtToken);
                setAuthenticated(true);
                setUsername(username);

                apiClient.interceptors.request.use((config) => {
                    config.headers.Authorization = jwtToken;
                    return config;
                })
                return true;
            } else {
                logout();
                return false;
            }
        } catch (err) {
            logout();
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
        setUsername("");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, setUsername, token}}>
            {children}
        </AuthContext.Provider>
    )
}