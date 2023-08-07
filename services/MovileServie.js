import axios from 'axios';

export default class MovileService {
    baseUrl = "http://localhost:8080/api/v1/movile/";

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    getById(id) {
        return axios.get(this.baseUrl + "get/"+id).then(res => res.data);
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

    deleteAll(moviles) {
        return axios.delete(this.baseUrl + "deleteAll", {data: moviles}).then(res => res.data);
    }

}