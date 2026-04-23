import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.45:5001/sigo",
  headers: {
    'Accept': 'application/json',
  }
});

const sheets = {

  postLogin: (instructor) => api.post('/instructor/login', instructor),
  postCadastro: (instructor) => api.post('/instructor', instructor),

  getClasses: () => api.get('/class'),
  getTurmas: () => api.get('/class'),
  getStudentsByClass: (fk_id_class) => api.get(`/student/class/${fk_id_class}`)
}


export default sheets;
