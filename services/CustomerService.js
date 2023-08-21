import axios from 'axios';

export default class CustomerService {
    baseUrl = "http://localhost:8080/api/v1/customer/";

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    getById(id) {
        return axios.get(this.baseUrl + "get/"+id).then(res => res.data);
    }

    save(customer) {
        return axios.post(this.baseUrl + "save", customer).then(res => res.data);
    }

    update(customer) {
        return axios.put(this.baseUrl + "update", customer).then(res => res.data);
    }

    delete(id) {
        return axios.delete(this.baseUrl + "delete/" + id).then(res => res.data);
    }

    deleteAll(customers) {
        return axios.delete(this.baseUrl + "deleteAll", {data: customers}).then(res => res.data);
    }

}