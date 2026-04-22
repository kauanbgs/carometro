import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/sigo",
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'

    }
})

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao acessar o localStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const sheets = {
    postLogin: (user) => api.post("/instructor/login", user),
    postCadastro: (user) => api.post("/instructor", user),
    postCadastroUser: (user) => api.post("/instructor", user),
    getDocentes: () => api.get("/instructor"),
    deleteDocente: (user) => api.delete("/instructor", { data: user }),

    getTurmas: () => api.get("/class"),
    getTurmaById: (id) => api.get(`/class/${id}`),
    getTurmaByName: (name) => api.get(`/class/name/${name}`),
    getTurmaByInstructorName: (name) => api.get(`/class/instructor/${name}`),
    postCriarTurma: (turma) => api.post("/class", turma),
    deleteTurma: (id_class) => api.delete(`/class/${id_class}`),

    getAlunosByTurma: (id_class) => api.get(`/student/class/${id_class}`),
    getAlunosByName: (name) => api.get(`/student/name/${name}`),
    getAlunosByNumber: (student_number) => api.get(`/student/number/${student_number}`),
    getAlunoById: (id_student) => api.get(`/student/id/${id_student}`),
    updateStudent: (id_student, student) => api.put(`/student/${id_student}`, student),
    deleteStudent: (id_student) => api.delete(`/student/${id_student}`),
    createStudent: (student) => api.post("/student", student),

    createOccurrence: (occurrence) => api.post("/occurrence", occurrence),
    readOccurrences: () => api.get("/occurrence"),
    getOccurrences: (id_student) => api.get(`/occurrence/${id_student}`),
    getOccurrenceById: (id_occurrence) => api.get(`/occurrence/id/${id_occurrence}`),
    deleteOccurrence: (id_occurrence) => api.delete(`/occurrence/${id_occurrence}`),
    updateOccurrence: (id_occurrence, occurrence) => api.put(`/occurrence/${id_occurrence}`, occurrence),


    // google classroom
    getClassesGoogle: (id_instructor) => api.get(`/google_classroom/${id_instructor}`),
    getAlunosByGClass: (id_class, id_instructor) => api.get(`/google_classroom/students/${id_class}/${id_instructor}`),
    postDisconnectGoogle: (id_instructor) => api.post(`/auth/google/disconnect/${id_instructor}`)
    

}

export default sheets
