import axios from 'axios';

export default class SellService {
    baseUrl = process.env.NEXT_PUBLIC_API_URL + '/sell/';

    getAll(token) {
        return axios.get(this.baseUrl + "all", {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getByDate(fecha, taller, token) {
        return axios.get(this.baseUrl + "all/date/" + fecha + "/" + taller, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllByWeek(token,taller) {
        return axios.get(this.baseUrl + "all/date/week/"+taller, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllByMonth(token,taller) {
        return axios.get(this.baseUrl + "all/date/month/"+taller, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getAllByMonthAndProduct(token,taller) {
        return axios.get(this.baseUrl + "all/date/month/product/"+taller, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getById(id,token) {
        return axios.get(this.baseUrl + "get/" + id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getPDFDiario(taller, ventas, token) {
        return axios.post(this.baseUrl + "pdf/diario/" + taller, ventas, {
            responseType: 'arraybuffer',
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    getPDFVenta(taller, name, ventas, token) {
        return axios.post(this.baseUrl + "pdf/venta/" + taller + "/" + name, ventas, {
            responseType: 'arraybuffer',
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data);
    }

    save(sell,token) {
        return axios.post(this.baseUrl + "save", sell, {
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

    deleteAll(sales, token) {
        return axios.delete(this.baseUrl + "deleteAll", {
            data: sales,
            headers: {
                "Authorization": "Bearer" + token
            }
        }).then(res => res.data);
    }

}