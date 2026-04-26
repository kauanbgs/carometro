import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.100.85:5001/sigo",
  headers: {
    'Accept': 'application/json',
  }
});

// ✅ Interceptor para JWT
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const sheets = {
  postLogin: (instructor) => api.post('/instructor/login', instructor),
  postCadastro: (instructor) => api.post('/instructor', instructor),
  DeleteDocente: (instructor) => api.delete('/instructor', { data: instructor }),

  getClasses: () => api.get('/class'),
  getTurmas: () => api.get('/class'),
  getInstructors: () => api.get('/instructor'),
  getClassByName: (name) => api.get(`/class/name/${name}`),
  getClassByInstructorName: (name) => api.get(`/class/instructor/${name}`),
  getStudentsByClass: (fk_id_class) => api.get(`/student/class/${fk_id_class}`),
  createStudent: (student) => api.post('/student', student), // ✅ adicionado
  createClass: (dadosTurma) => api.post('/class', dadosTurma),
}

export default sheets;