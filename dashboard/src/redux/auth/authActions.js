import {AUTH_LOGIN, AUTH_LOGOUT} from './authType';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import Cookie from 'js-cookie'
import {base_URL} from '../'

export const login = (token) => {
    return {
        type: AUTH_LOGIN,
        payload: token
    }
}

export const logout = () => {
    return {
        type: AUTH_LOGOUT
    }
}
export const  loginRequest = (formData, setError) => {
    return (dispatch) => {
        axios.post(base_URL+'/auth/login', formData)
            .then(res => {
                const token = res.data.token;
                setCookie('token', token, { expires: 1, path: '/' });
                dispatch(login(res.data.token));
                console.log(Cookie.get('token'));
                return <Navigate to='/' />
            }).catch(err => {
                console.log(err);
                setError(err.response.data.error);
            })
    }
}
const setCookie = (name, value) => {
    console.log('cookie');
    
    Cookie.set(name, value, { expires: 1, secure: true, sameSite: 'strict', path: '/' });
}
