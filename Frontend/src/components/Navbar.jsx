import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../features/auth/Hooks/useAuth.js'

import './navbar.scss'
import { logout } from '../features/auth/services/auth.api.js'

const Navbar = (req,res) => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [username ,setUsername] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)
 
    const handleLogout = () => {
        logout()
        navigate('/login')
        setProfileDropdown(false)
    }



    return (
        <nav className='navbar'>
            <div className='navbar__container'>
                {/* Logo & Brand */}
                <div className='navbar__brand'>
                    <button 
                        className='navbar__logo'
                        onClick={() => {
                            navigate('/')
                            setMobileMenuOpen(false)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span>InterviewPro</span>
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className={`navbar__menu ${mobileMenuOpen ? 'navbar__menu--active' : ''}`}>
                    <button 
                        className='navbar__nav-item'
                        onClick={() => {
                            navigate('/')
                            setMobileMenuOpen(false)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        </svg>
                        Home
                    </button>
                    <a href='#' className='navbar__nav-item'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                        Resources
                    </a>
                    <a href='#' className='navbar__nav-item'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        Support
                    </a>
                </div>

                {/* Right Section: Auth & Profile */}
                <div className='navbar__right'>
                    {user ? (
                        <div className='navbar__profile'>
                            <button 
                                className='navbar__profile-btn'
                                onClick={() => setProfileDropdown(!profileDropdown)}
                            >
                                <div className='navbar__avatar'>
                                    {user?.username.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className='navbar__user-name'>{user?.username || 'User'}</span>
                                <svg 
                                    className={`navbar__dropdown-arrow ${profileDropdown ? 'navbar__dropdown-arrow--open' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>

                            {profileDropdown && (
                                <div className='navbar__dropdown'>
                                    <button className='navbar__dropdown-item'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        Profile
                                    </button>
                                    <button className='navbar__dropdown-item'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="12" cy="5" r="1"></circle>
                                            <circle cx="12" cy="19" r="1"></circle>
                                        </svg>
                                        Settings
                                    </button>
                                    <div className='navbar__dropdown-divider' />
                                    <button 
                                        className='navbar__dropdown-item navbar__dropdown-item--danger'
                                        onClick={handleLogout}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='navbar__auth'>
                            <button 
                                className='navbar__btn navbar__btn--secondary'
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                            <button 
                                className='navbar__btn navbar__btn--primary'
                                onClick={() => navigate('/register')}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className={`navbar__mobile-toggle ${mobileMenuOpen ? 'navbar__mobile-toggle--open' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
