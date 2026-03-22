import { createContext,useState,useEffect, use } from "react";// createContext is used to create a context object, and useState is a hook that allows us to manage state in a functional component. by using createContext, we can create a context that can be shared across multiple components without having to pass props down manually at every level. The useState hook allows us to manage the state of the user and loading status within the AuthProvider component.
import { getMe } from "./services/auth.api";
export const AuthContext = createContext() // This line creates a new context object called AuthContext. This context will be used to share authentication-related data (like the current user and loading status) across the component tree without having to pass props down manually at every level.

export const AuthProvider = ({ children }) => { // This line defines a functional component called AuthProvider. It takes a single prop called children, which represents the child components that will be wrapped by this provider. The AuthProvider component will use the AuthContext to provide authentication-related data to its children.

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { // This useEffect hook runs when the component mounts. It calls the getMe function to check if the user is already authenticated (e.g., by checking for a valid session or token). If the request is successful, it sets the user state with the retrieved user data. If there's an error (e.g., the user is not authenticated), it logs the error and ensures that the user state is set to null. Finally, it sets the loading state to false, indicating that the authentication check is complete.
        const fetchUser = async () => {
            try {
                const response = await getMe();
                setUser(response.data.user);
            }
            catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        }
        fetchUser();
    }
        , []); // The empty dependency array means this effect will only run once when the component mounts.

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}> { /* This line returns a JSX element that renders the AuthContext.Provider component. The value prop of the provider is set to an object containing the user, setUser, loading, and setLoading state variables. This means that any component that consumes this context will have access to these values and functions.*/  }
            {children}
        </AuthContext.Provider>
    )


}