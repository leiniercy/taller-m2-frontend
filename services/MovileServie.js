import axios from 'axios';

export default class MovileService {
    baseUrl = process.env.NEXT_PUBLIC_API_URL + '/movile/';

    getAll(token,taller) {
        return axios.get(this.baseUrl + "all/"+taller, {
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

    getCant(token,taller) {
        return axios.get(this.baseUrl + "getCant/"+taller, {
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

    deleteAll(moviles, token) {
        return axios.delete(this.baseUrl + "deleteAll", {
            data: moviles,
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

}