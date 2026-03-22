import { useAuth } from '../Hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SpinnerInfinity, SpinnerCircular } from 'spinners-react';

export const Protected = ({ children }) => {// this component will be used to protect the routes that require authentication, it will check if the user is authenticated or not, if not it will redirect to login page, if yes it will render the children components

    const { user, loading } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => { // this useEffect will run when the component mounts and whenever the user or loading state changes, it will check if the user is authenticated or not, if not it will redirect to login page
        if (!loading && !user) {
            navigate('/login'); // if user is not authenticated, we will navigate to login page, we will also check if loading is false to avoid redirecting to login page while we are checking the authentication status of the user, because when the component mounts, the loading state will be true until we get the response from the server about the authentication status of the user, so we don't want to redirect to login page while loading is true, we want to wait until loading is false and then check if user is authenticated or not, if user is not authenticated and loading is false then we will redirect to login page
        }
    }, [user, loading, navigate]);

    if (loading) {
        return  <SpinnerInfinity  className="spinner" size={90} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />
    }

    if (!user) {
        return null;
    }

    return children; // if user is authenticated, we will render the children components, which are the protected routes
}

export default Protected;