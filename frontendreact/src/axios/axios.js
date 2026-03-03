import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/carometro",
    headers: {'accept':'application/json'}
})

const sheets = {
    postLogin: (user) => api.post("/docente/login", user),
}

export default sheets
