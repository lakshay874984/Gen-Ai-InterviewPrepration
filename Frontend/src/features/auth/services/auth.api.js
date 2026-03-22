import axios from 'axios';

const API_URL = axios.create({ baseURL: 'http://localhost:3000/api/auth' ,
    withCredentials: true // This is important to include cookies in the request
}
); // Change this to your backend URL

export const register = async ({ email, password, username }) => {
    return await API_URL.post('/register', { email, password, username });
}

export const login = async ({ email, password }) => {
    return await API_URL.post('/login', { email, password },);
}


export const logout = async () => {
    return await API_URL.get('/logout');
}

export const getMe = async () => {
    return await API_URL.get('/get-me');
}