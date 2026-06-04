import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.100.46:5000/sigo",
    headers: {
        'accept': 'application/json'
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


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "";

    if (status === 401) {
      // Só faz logout se for token expirado ou não fornecido (não para 401 do Google Classroom)
      const isTokenError =
        message.includes("Token") ||
        message.includes("token") ||
        message.includes("Expired");

      if (isTokenError) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    } else if (status === 403) {
      window.location.href = "/home";
    }
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
    updateTurma: (id_class, turma) => api.put(`/class/${id_class}`, turma),

    getAlunosByTurma: (id_class) => api.get(`/student/class/${id_class}`),
    getAlunosByName: (name) => api.get(`/student/name/${name}`),
    getAlunosByNumber: (student_number) => api.get(`/student/number/${student_number}`),
    getAlunoById: (id_student) => api.get(`/student/id/${id_student}`),
    updateStudent: (id_student, student) => {
        const data = new FormData()
        for(let key in student) {
            if(key !== "photo") data.append(key, student[key]);
        }
        if(student.photo) data.append("photo", student.photo);
        return api.put(`/student/${id_student}`, data, {
            headers: {
                Accept: "application/json"
            }
        })
    },
    deleteStudent: (id_student) => api.delete(`/student/${id_student}`),
    createStudent: (form, photo) => {
        const data = new FormData()
        for(let key in form) data.append(key,form[key]);
        if(photo) data.append("photo", photo);
        
        return api.post("/student", data, {
            headers: {
                Accept: "application/json"
            }
        })
    },

    createOccurrence: (occurrence) => api.post("/occurrence", occurrence),
    readOccurrences: () => api.get("/occurrence"),
    getOccurrences: (id_student) => api.get(`/occurrence/${id_student}`),
    getOccurrenceById: (id_occurrence) => api.get(`/occurrence/id/${id_occurrence}`),
    deleteOccurrence: (id_occurrence) => api.delete(`/occurrence/${id_occurrence}`),
    updateOccurrence: (id_occurrence, occurrence) => api.put(`/occurrence/${id_occurrence}`, occurrence),


    getInstructors: () => api.get("/instructor"),
    getInstructorById: (id_instructor) => api.get(`/instructor/${id_instructor}`),
    getInstructorByName: (name) => api.get(`/instructor/name/${name}`),
    updateInstructor: (id_instructor, data) => api.put(`/instructor/${id_instructor}`, data),
    deleteInstructor: (id_instructor) => api.delete(`/instructor/${id_instructor}`),

    // google classroom
    getClassesGoogle: (id_instructor) => api.get(`/google_classroom/${id_instructor}`),
    getAlunosByGClass: (id_class, id_instructor) => api.get(`/google_classroom/students/${id_class}/${id_instructor}`),
    postDisconnectGoogle: (id_instructor) => api.post(`/auth/google/disconnect/${id_instructor}`)
    

}

export default sheets
