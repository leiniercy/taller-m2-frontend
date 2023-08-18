import axios from 'axios';

export default class ProductService {
    baseUrl = "http://localhost:8080/api/v1/product/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data);
    }

    getAll2M() {
        return axios.get(this.baseUrl + "all/2M").then(res => res.data);
    }
    getAllMJ() {
        return axios.get(this.baseUrl + "all/MJ").then(res => res.data);
    }
    getAllProducts(){
        return axios.get(this.baseUrl+"all/accesorio").then(res => res.data);
    }
    getAllProductsCantThanCero(){
        return axios.get(this.baseUrl+"all/product/cant").then(res => res.data);
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