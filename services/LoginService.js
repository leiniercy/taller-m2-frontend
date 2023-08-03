import axios from 'axios';

export default class LoginService {
    baseUrl = "http://localhost:8080/api/v1/auth/";
    login(signInRequest){
        return axios.post(this.baseUrl+"signin",signInRequest).then(res => res.data);
    }

    // save(formData){
    //     return axios.post(this.baseUrl +"save",formData).then(res => res.data);
    // }
    //
    // update(formData,id){
    //     return axios.put(this.baseUrl +"update/"+id,formData).then(res => res.data);
    // }
    //
    // delete(id){
    //     return axios.delete(this.baseUrl +"delete/"+id).then(res => res.data);
    // }
    //
    // deleteAll(products){
    //     return axios.delete(this.baseUrl +"deleteAll",{data: products}).then(res => res.data);
    // }
}