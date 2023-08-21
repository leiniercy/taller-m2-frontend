import axios from 'axios';

export default class LoginService {
    baseUrl = "http://localhost:8080/api/v1/auth/";
    login(signInRequest){
        return axios.post(this.baseUrl+"signin",signInRequest).then(res => res.data);
    }
    findUser(email){
        return axios.get(this.baseUrl+"get/"+email).then(res => res.data);
    }
    sendEmail(email){
        return axios.get(this.baseUrl+"email/"+email).then(res => res.data);
    }

}