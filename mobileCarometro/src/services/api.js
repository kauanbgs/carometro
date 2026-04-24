import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.85:5001/sigo",
  headers: {
    'Accept': 'application/json',
  }
});

const sheets = {
  postLogin: (instructor) => api.post('/instructor/login', instructor),
  postCadastro: (instructor) => api.post('/instructor', instructor),
  DeleteDocente: (config) => api.delete('/instructor', config),

  getClasses: () => api.get('/class'),
  getTurmas: () => api.get('/class'),
  getInstructors: () => api.get('/instructor'),
  getClassByName: (name) => api.get(`/class/name/${name}`),
  getClassByInstructorName: (name) => api.get(`/class/instructor/${name}`), // ✅ adicionado
  getStudentsByClass: (fk_id_class) => api.get(`/student/class/${fk_id_class}`),
}

export default sheets;