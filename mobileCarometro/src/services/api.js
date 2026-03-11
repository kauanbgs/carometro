// npm i axios

import axios from "axios";

const api = axios.create({
    baseURL:"http://MUDAR_O_IP:5000/api/v1",
    headers:{
        'Accept':'application/json',
    }
});

const sheets = {

    // postLogin: (user) => api.post('/login', user)
    
}


export default sheets;
