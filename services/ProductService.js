import axios from 'axios';

export default class ProductService {
    baseUrl = "http://localhost:8080/api/v1/product/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res => res.data);
    }

    save(formData){
        return axios.post(this.baseUrl +"save",formData).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl +"delete/"+id).then(res => res.data);
    }

    deleteAll(products){
        return axios.delete(this.baseUrl +"deleteAll",{data: products}).then(res => res.data);
    }
}