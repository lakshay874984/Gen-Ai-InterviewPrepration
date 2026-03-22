import React,{useState} from 'react'
import '../auth.form.scss'
import { useNavigate } from 'react-router';
import { login } from "../services/auth.api.js";
import { useAuth } from '../Hooks/useAuth.js';
import { SpinnerInfinity, SpinnerCircular } from 'spinners-react';
export const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {loading , handleLogin} = useAuth();
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();  // this prevents the default behavior of form submit, which is to reload the page, we don't want that because we will handle the login logic in the same page, so we don't want to reload the page when we click on login button
        // Handle login logic here
        const email = e.target.email.value;
        const password = e.target.password.value;
        await handleLogin({email, password}).then(() => {
            setSuccess("Login successful!");
            setError(""); 
            navigate('/'); // after successful login, we will navigate to home page
        }).catch((err) => {
            setError(err.response.data.message || "Login failed!");
            setSuccess("");
            navigate('/login'); // after failed login, we will stay on login page
        });

        



       


        
       
    }

    if(loading) {
            return (
                <main className='loading-screen'>
                    <SpinnerInfinity size={90} thickness={100} speed={100} color="#9d4edd" secondaryColor="rgba(157, 78, 221, 0.2)" />
                </main>
            )
        }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            <form onSubmit={handleSubmit}> {/* we will handle submit event of form, so that page does not reload when we click on login button */}
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <button className='button primary-button'>Login</button> {/* inside a from , a button auttomatically becomes submit button, so no need to specify type="submit" */}
            </form>
            <p>Don't have an account? <span className='link login-link' onClick={() => navigate('/register')}>Register here</span></p>
            {/* when we click on register here, we will navigate to register page using useNavigate hook from react-router-dom */}
            {/* we can also use Link component from react-router-dom, but it will cause page reload, so we will use useNavigate hook instead */}
        </div>
    </main>
  )
}
