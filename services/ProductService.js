import axios from 'axios';

export default class ProductService {
    baseUrl = process.env.NEXT_PUBLIC_API_URL+'/product/';
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data);
    }
    getAllProducts2M() {
        return axios.get(this.baseUrl + "all/products/2M").then(res => res.data);
    }
    getAllProductsMJ() {
        return axios.get(this.baseUrl + "all/products/MJ").then(res => res.data);
    }
    getAllAccesorios2M() {
        return axios.get(this.baseUrl + "all/accesorios/2M").then(res => res.data);
    }
    getAllAccesoriosMJ() {
        return axios.get(this.baseUrl + "all/accesorios/MJ").then(res => res.data);
    }
    getAllProducts(){
        return axios.get(this.baseUrl+"all/accesorio").then(res => res.data);
    }
    getAllProductsCantThanCero(taller){
        return axios.get(this.baseUrl+"all/product/cant/"+taller).then(res => res.data);
    }
    getCant() {
        return axios.get(this.baseUrl + "getCant").then(res => res.data);
    }

    save(formData){
        return axios.post(this.baseUrl +"save",formData).then(res => res.data);
    }

    update(formData,id){
        return axios.put(this.baseUrl +"update/"+id,formData).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl +"delete/"+id).then(res => res.data);
    }

    deleteAll(products){
        return axios.delete(this.baseUrl +"deleteAll",{data: products}).then(res => res.data);
    }
}