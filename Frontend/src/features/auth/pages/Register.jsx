import React,{useState} from 'react'
import { useNavigate } from 'react-router';
import '../auth.form.scss'

import { useAuth } from '../Hooks/useAuth.js';
import { SpinnerInfinity, SpinnerCircular } from 'spinners-react';



const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {loading , handleRegister} = useAuth();

    



    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const email = e.target.email.value;
        const password = e.target.password.value;
        const username = e.target.username.value;
        await handleRegister({email, password, username}).then(() => {
            setSuccess("Registration successful!");
            setError(""); 
            navigate('/'); // after successful registration, we will navigate to home page
        }).catch((err) => {
            setError(err.response.data.message);
            setSuccess("");
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
            <h1>Register</h1>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            <form onSubmit={handleSubmit}> {/* we will handle submit event of form, so that page does not reload when we click on login button */}
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <button className='button primary-button'>Register</button> {/* inside a from , a button auttomatically becomes submit button, so no need to specify type="submit" */}
            </form>
            <p>Already have an account? <span className='link login-link' onClick={() => navigate('/login')}>Login here</span></p>
            {/* when we click on login here, we will navigate to login page using useNavigate hook from react-router-dom */}
            {/* we can also use Link component from react-router-dom, but it will cause page reload, so we will use useNavigate hook instead */}
        </div>

    </main>
  )
}

export default Register
