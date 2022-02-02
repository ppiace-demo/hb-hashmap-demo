import axios from 'axios';
import jwt_decode from "jwt-decode";

const STORAGE_KEY = process.env.VUE_APP_JWT_STORAGE_KEY;
const API_URL = process.env.VUE_APP_API_URL;

class AuthService {


  

  login(username, password) {
    return axios
      .post(API_URL + '/auth/login', {
        username: username,
        password: password
      })
      .then(response => {
        if (response.data.success && response.data.access_token) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data.access_token));
        }

        return response.data;
      }).catch(err => {
        console.log("Login error ", err);
        return { success: false, message : "Login failed" }
      });
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  register(username, password, is_admin) {
    console.log(API_URL)
    return axios.post(API_URL + '/auth/register', {
       username,
       password,
       is_admin
    }).then(response => {
      if (response.data.success && response.data.access_token) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data.access_token));
      }
      return response.data;
    }).catch(err => {
      console.log("Register error ", err);
      return { success: false, message : "Unkown registration error" }
    });
  }

  isLoggedIn(){
    let jwt = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return jwt ? true : false;
  }

  isAdmin(){
    let jwt = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const decodedJwt = jwt_decode(jwt);
    return decodedJwt?.is_admin ? true : false;
  }

  getAuthHeader(){
    let jwt = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return jwt ? { 'Authorization' : 'Bearer ' + jwt } : {}
  }

  getUserData(){
    let jwt = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const decodedJwt = jwt_decode(jwt);
    return decodedJwt;
  }
}

export default new AuthService();