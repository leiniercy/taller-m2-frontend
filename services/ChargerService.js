import axios from 'axios';

export default class ChargerService {
    baseUrl = process.env.NEXT_PUBLIC_API_URL + "/charger/";

    getAll(token) {
        return axios.get(this.baseUrl + "all", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAll2M(token) {
        return axios.get(this.baseUrl + "all/2M", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllMJ(token) {
        return axios.get(this.baseUrl + "all/MJ", {
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

    getCant(token) {
        return axios.get(this.baseUrl + "getCant", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    save(formData, token) {
        return axios.post(this.baseUrl + "save", formData, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    update(formData, id, token) {
        return axios.put(this.baseUrl + "update/" + id, formData, {
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

    deleteAll(chargers, token) {
        return axios.delete(this.baseUrl + "deleteAll", {
            data: chargers,
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

}