import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://10.89.240.77:5000/sigo",
  headers: {
    'Accept': 'application/json',
  }
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const sheets = {

  postLogin: (instructor) => api.post('/instructor/login', instructor),
  postCadastro: (instructor) => api.post('/instructor', instructor),
  getInstructors: () => api.get('/instructor'),
  getInstructorByName: (name) => api.get(`/instructor/name/${name}`),
  getInstructorById: (id) => api.get(`/instructor/${id}`),
  DeleteDocente: (instructor) => api.delete('/instructor', { data: instructor }),
  updateInstructor: (id_instructor, data) => api.put(`/instructor/${id_instructor}`, data),

  getClasses: () => api.get('/class'),
  getTurmas: () => api.get('/class'),
  getClassByName: (name) => api.get(`/class/name/${name}`),
  getClassByInstructorName: (name) => api.get(`/class/instructor/${name}`),
  createClass: (dadosTurma) => api.post('/class', dadosTurma),


  getStudentsByClass: (fk_id_class) => api.get(`/student/class/${fk_id_class}`),
  getStudentByID: (id_student) => api.get(`/student/id/${id_student}`),
  createStudent: (student) => api.post('/student', student),
  updateStudent: (id_student, studentData) => api.put(`/student/${id_student}`, studentData),
  deleteStudent: (id_student) => api.delete(`/student/${id_student}`),
  getStudentPhoto: (id_student) => api.get(`/student/photo/${id_student}`, { responseType: 'arraybuffer' }),
  

  updateStudentPhoto: (id_student, formData) => {
    return api.patch(`/student/${id_student}/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },


  getOccurrencesByStudent: (fk_id_student) => api.get(`/occurrence/${fk_id_student}`),
  createOccurrence: (occurrenceData) => api.post('/occurrence', occurrenceData),
}

export default sheets;