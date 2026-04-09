import axios from "axios";

const api = axios.create({
    baseURL:"http://10.89.240.80:5000/sigo",
    headers:{
        'Accept':'application/json',
    }
});

const sheets = {

    postLogin: (instructor) => api.post('/instructor/login', instructor),
    postCadastro:(instructor) => api.post('/instructor',instructor)

}


export default sheets;
