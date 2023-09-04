import axios from 'axios';

export default class ProductService {
    baseUrl = process.env.NEXT_PUBLIC_API_URL + '/product/';

    getAll(token) {
        return axios.get(this.baseUrl + "all", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllProducts2M(token) {
        return axios.get(this.baseUrl + "all/products/2M", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllProductsMJ(token) {
        return axios.get(this.baseUrl + "all/products/MJ", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllAccesorios2M(token) {
        return axios.get(this.baseUrl + "all/accesorios/2M", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllAccesoriosMJ(token) {
        return axios.get(this.baseUrl + "all/accesorios/MJ", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllProducts(token) {
        return axios.get(this.baseUrl + "all/accesorio", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllProductsCantThanCero(taller, token) {
        return axios.get(this.baseUrl + "all/product/cant/" + taller, {
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

    deleteAll(products, token) {
        return axios.delete(this.baseUrl + "deleteAll", {
            data: products,
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }
}