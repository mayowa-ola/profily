
 
import http from './httpsServices';
import jwtDecode from 'jwt-decode';

const apiEndPoint = `/users`;


export function userLogin(user){
        return http.post(`${apiEndPoint}/login`,{
            password: user.password,
            email: user.email,
        });   
}

export function userRegister(user){
        return http.post(`${apiEndPoint}/register`,{
            password: user.password,
            email: user.email,
            name: user.name,
        });   
}

export function getUser(user, userId){
        return http.get(`${apiEndPoint}/${userId}`);   
}
export function updateProfile(user, userId){
        return http.get(`${apiEndPoint}/${userId}`);   
}

export function googleAuth(){
        return http.get(`${apiEndPoint}/auth/google`);   
}


export function getCurrentUser() {
    try {
         const jwt = localStorage.getItem('token');

         console.log(jwtDecode(jwt));
         return jwtDecode(jwt);
         
       }
       catch(ex){
            return null;
       }
}