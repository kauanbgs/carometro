import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.47:5000/sigo",
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
  getDocentes: () => api.get('/instructor'),
  getInstructors: () => api.get('/instructor'),
  getTurmaByName: (name) => api.get(`/class/name/${name}`),
  getClassByName: (name) => api.get(`/class/name/${name}`),
  getTurmaByInstructorName: (name) => api.get(`/class/instructor/${name}`),
  postCriarTurma: (data) => api.post('/class', data),}


export default sheets;
