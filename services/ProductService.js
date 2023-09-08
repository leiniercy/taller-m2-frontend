import axios from 'axios';

export default class ProductService {
    baseUrl = process.env.NEXT_PUBLIC_API_URL + '/product/';

    getAll(token,taller) {
        return axios.get(this.baseUrl + "all/"+taller, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllProducts(token, taller) {
        return axios.get(this.baseUrl + "all/accesorio/"+taller, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllProductsCantThanCero(token,taller) {
        return axios.get(this.baseUrl + "all/product/cant/" + taller, {
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

    deleteAll(products, token) {
        return axios.delete(this.baseUrl + "deleteAll", {
            data: products,
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }
}