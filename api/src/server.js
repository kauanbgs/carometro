const app = require("./index");
const PORT = 5000;
const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));