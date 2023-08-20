import axios from 'axios';

export default class UserService {
    baseUrl = "http://localhost:8080/api/v1/user/";

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    getById(id) {
        return axios.get(this.baseUrl + "get/"+id).then(res => res.data);
    }
    getByUsername(username) {
        return axios.get(this.baseUrl + "get/name/"+username).then(res => res.data);
    }

    save(customer) {
        return axios.post(this.baseUrl + "save", customer).then(res => res.data);
    }

    update(formData, id) {
        return axios.put(this.baseUrl + "update/" + id, formData).then(res => res.data);
    }

    changePasword(id, password) {
        return axios.put(this.baseUrl + "change/password/" + id +"/"+ password).then(res => res.data);
    }

    delete(id) {
        return axios.delete(this.baseUrl + "delete/" + id).then(res => res.data);
    }

    deleteAll(customers) {
        return axios.delete(this.baseUrl + "deleteAll", {data: customers}).then(res => res.data);
    }

}