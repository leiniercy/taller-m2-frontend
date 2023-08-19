import axios from 'axios';

export default class SellService {
    baseUrl = "http://localhost:8080/api/v1/sell/";

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    getByDate(fecha, taller) {
        return axios.get(this.baseUrl + "all/date/" + fecha + "/" + taller).then(res => res.data);
    }

    getById(id) {
        return axios.get(this.baseUrl + "get/" + id).then(res => res.data);
    }

    getPDFDiario(taller, ventas) {
        return axios.post(this.baseUrl + "pdf/diario/" + taller, ventas, {responseType: 'arraybuffer'}).then(res => res.data);
    }

    getPDFVenta(taller, ventas) {
        return axios.post(this.baseUrl + "pdf/venta/"+taller, ventas, {responseType: 'arraybuffer'}).then(res => res.data);
    }

    save(sell) {
        return axios.post(this.baseUrl + "save", sell).then(res => res.data);
    }

    update(formData, id) {
        return axios.put(this.baseUrl + "update/" + id, formData).then(res => res.data);
    }

    delete(id) {
        return axios.delete(this.baseUrl + "delete/" + id).then(res => res.data);
    }

    deleteAll(sales) {
        return axios.delete(this.baseUrl + "deleteAll", {data: sales}).then(res => res.data);
    }

}