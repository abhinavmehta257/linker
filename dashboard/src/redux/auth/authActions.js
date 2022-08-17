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
                setCookie('token', token);
                dispatch(login(res.data.token));
                // console.log(Cookies.get('token'));
                return <Navigate to='/' />
            }).catch(err => {
                console.log(err);
                setError(err.response.data.error);
            })
    }
}

// export const setCookieaction = (token)=>{
//     return (dispatch)=>{
//         setCookie('token', '123', 1);
        
//     }
// }

// function setCookie(name,value,days) {
//     console.log('cookie');
//     var expires = "";
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days*24*60*60*1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "")  + expires + "; path=/";
// }

const setCookie = (name, value) => {
    console.log('cookie');
    console.log(value);
    
    Cookie.set(name, value, { expires: 1, secure: true, sameSite: 'strict', path: '/' });
}
