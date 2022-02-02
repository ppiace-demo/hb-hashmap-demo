import axios from 'axios';
import jwt_decode from "jwt-decode";
import AuthService from './auth.service';


const API_URL = process.env.VUE_APP_API_URL;

class UserService {

  getMe(){
    return axios
      .get(API_URL + '/user/me', { headers: AuthService.getAuthHeader() })
      .then(response => {
        return response.data;        
      }).catch(err => {
        console.log("getMe error ", err);
        return { success: false, message : "Unable to load users" }
      });
  }

  getAllUsers() {
    return axios
      .get(API_URL + '/user/all', { headers: AuthService.getAuthHeader() })
      .then(response => {
        return response.data;        
      }).catch(err => {
        console.log("getAllUsers error ", err);
        return { success: false, message : "Unable to load users" }
      });
  }

  delete(userId){
    return axios
      .delete(API_URL + '/user/' + userId, { headers: AuthService.getAuthHeader() })
      .then(response => {
        return response.data;        
      }).catch(err => {
        console.log("getMe error ", err);
        return { success: false, message : "Unable to delete user" }
      });
  }

  getUser(userId){
    return axios
      .get(API_URL + '/user/' + userId, { headers: AuthService.getAuthHeader() })
      .then(response => {
        return response.data;        
      }).catch(err => {
        console.log("getUser error ", err);
        return { success: false, message : "Unable to get user" }
      });
  }

}

export default new UserService();