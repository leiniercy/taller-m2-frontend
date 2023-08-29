import axios from 'axios';

export default class LoginService {
    baseUrl = process.env.NEXT_PUBLIC_API_URL+'/auth/';

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