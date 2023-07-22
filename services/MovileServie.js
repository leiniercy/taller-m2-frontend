import axios from 'axios';

export default class MovileService {
    baseUrl = "http://localhost:8080/api/v1/movile/";
    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }
    save(book){
        return axios.post(this.baseUrl + "save",employee).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl +"delete/"+id).then(res => res.data);
    }
}