import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.85:5000/sigo",
  headers: {
    'Accept': 'application/json',
  }
});

const sheets = {

  postLogin: (instructor) => api.post('/instructor/login', instructor),
  postCadastro: (instructor) => api.post('/instructor', instructor),

  getClasses: () => api.get('/class'),
  getTurmas: () => api.get('/class'),
  getDocentes: () => api.get('/instructor'),
  getInstructors: () => api.get('/instructor'),
  getTurmaByName: (name) => api.get(`/class/name/${name}`),
  getClassByName: (name) => api.get(`/class/name/${name}`),
  getTurmaByInstructorName: (name) => api.get(`/class/instructor/${name}`),
  postCriarTurma: (data) => api.post('/class', data),}


export default sheets;
