import axios from "axios";

const api = axios.create({
    baseURL:"http://192.168.100.75:5000/carometro",
    headers:{
        'Accept':'application/json',
    }
});

const sheets = {

    postLogin: (docente) => api.post('/docente/login', docente),
    postCadastro:(docente) => api.post('/docente',docente)

}


export default sheets;
