import axios from 'axios';

export default class CustomerService {
    baseUrl = process.env.NEXT_PUBLIC_API_URL + '/customer/';

    getAll(token) {
        return axios.get(this.baseUrl + "all", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getById(id, token) {
        return axios.get(this.baseUrl + "get/" + id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    save(customer, token) {
        return axios.post(this.baseUrl + "save", customer, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    update(customer, token) {
        return axios.put(this.baseUrl + "update", customer, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    delete(id, token) {
        return axios.delete(this.baseUrl + "delete/" + id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    deleteAll(customers, token) {
        return axios.delete(this.baseUrl + "deleteAll", {
            data: customers,
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

}