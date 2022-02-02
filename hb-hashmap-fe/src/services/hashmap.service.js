import axios from 'axios';
import jwt_decode from "jwt-decode";
import AuthService from './auth.service';


const API_URL = process.env.VUE_APP_API_URL;

class HashmapService {

  getMyHashmap(){
    return axios
      .get(API_URL + '/hashmap', { headers: AuthService.getAuthHeader() })
      .then(response => {
        return response.data;        
      }).catch(err => {
        console.log("getMyHasmap error ", err);
        return { success: false, message : "Unable to load Hashmap" }
      });
  } 

  insert(key,value){
    return axios
      .post(API_URL + '/hashmap', { key, value}, { headers: AuthService.getAuthHeader() })
      .then(response => {
        return  { success: true, data: response.data };        
      }).catch(err => {
        console.log("insert error ", err);
        return { success: false, message : "Unable to insert key value" }
      });
  } 

  remove(key){
    return axios
      .delete(API_URL + '/hashmap/' + key, { headers: AuthService.getAuthHeader() })
      .then(response => {
        return  { success: true, data: response.data };          
      }).catch(err => {
        console.log("remove error ", err);
        return { success: false, message : "Unable to remove key" }
      });
  } 

  clear(){
    return axios
      .delete(API_URL + '/hashmap', { headers: AuthService.getAuthHeader() })
      .then(response => {
        return  { success: true, data: response.data };          
      }).catch(err => {
        console.log("remove error ", err);
        return { success: false, message : "Unable to clear map" }
      });
  } 

}

export default new HashmapService();