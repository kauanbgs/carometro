import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/carometro",
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const sheets = {
    postLogin: (user) => api.post("/docente/login", user),
    postCadastro: (user) => api.post("/docente", user),
    getDocentes: () => api.get("/docente"),
}

export default sheets
