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
    postCadastroUser: (user) => api.post("/instructor", user),
    getDocentes: () => api.get("/instructor"),
    deleteDocente: (user) => api.delete("/instructor", { data: user }),

    getTurmas: () => api.get("/class"),
    getTurmaByName: (name) => api.get(`/class/name/${name}`),
    getTurmaByInstructorName: (name) => api.get(`/class/instructor/${name}`),
    postCriarTurma: (turma) => api.post("/class", turma),
}

export default sheets
