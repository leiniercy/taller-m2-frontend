import axios from 'axios';

export default class ChargerService {
    baseUrl = "http://localhost:8080/api/v1/charger/";

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    getAll2M() {
        return axios.get(this.baseUrl + "all/2M").then(res => res.data);
    }
    getAllMJ() {
        return axios.get(this.baseUrl + "all/MJ").then(res => res.data);
    }

    getById(id) {
        return axios.get(this.baseUrl + "get/"+id).then(res => res.data);
    }

    getCant() {
        return axios.get(this.baseUrl + "getCant").then(res => res.data);
    }

    save(formData) {
        return axios.post(this.baseUrl + "save", formData).then(res => res.data);
    }

    update(formData, id) {
        return axios.put(this.baseUrl + "update/" + id, formData).then(res => res.data);
    }

    delete(id) {
        return axios.delete(this.baseUrl + "delete/" + id).then(res => res.data);
    }

    deleteAll(chargers) {
        return axios.delete(this.baseUrl + "deleteAll", {data: chargers}).then(res => res.data);
    }

}