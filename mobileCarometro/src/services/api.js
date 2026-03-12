import axios from "axios";

const api = axios.create({
    baseURL:"http://10.89.240.100:5000/api/v1",
    headers:{
        'Accept':'application/json',
    }
});

const sheets = {

    postLogin: (docente) => api.post('/docente/login', docente)

}


export default sheets;
