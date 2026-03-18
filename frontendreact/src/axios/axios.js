import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/sigo",
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

const sheets = {
    postLogin: (user) => api.post("/instructor/login", user),
    postCadastro: (user) => api.post("/instructor", user),
    getDocentes: () => api.get("/instructor"),
    deleteDocente: (user) => api.delete("/instructor", { data: user }),
}

export default sheets
