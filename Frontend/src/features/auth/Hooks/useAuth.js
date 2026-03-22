import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api.js";

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext); // This line uses the useContext hook to access the values provided by the AuthContext. It destructures the user, setUser, loading, and setLoading values from the context. This allows any component that calls the useAuth hook to access and manipulate the authentication-related state (like the current user and loading status) without having to pass props down manually at every level.

    const handleLogin = async ({email, password}) => {
        setLoading(true);
        try {
            const response = await login({ email, password });
          
            setUser(response.data.user);
        } catch (error) {
            throw error; // re-throw the error to be handled in the component that calls handleLogin
        }
        finally {
            setLoading(false);
        }
    }
    
    const handleRegister = async ({email, password, username}) => {
        setLoading(true);
        try {
            const response = await register({ email, password, username });
            setUser(response.data.user);
        }
        catch (error) {
            throw error; // re-throw the error to be handled in the component that calls handleRegister
        }
        finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            req.user = ""
        }
        catch (error) {
            throw error; // re-throw the error to be handled in the component that calls handleLogout
        }
        finally {
            setLoading(false);
        }
    }

    const getme = async () => {
        setLoading(true);
        try {
            const response = await getMe();
            setUser(response.data.user);
        }
        catch (error) {
            throw error; // re-throw the error to be handled in the component that calls getme
        }
        finally {
            setLoading(false);
        }
    }


    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout, getme }; // This line returns an object containing the user, setUser, loading, and setLoading values. This allows components that use the useAuth hook to easily access and manipulate the authentication-related state.
} 