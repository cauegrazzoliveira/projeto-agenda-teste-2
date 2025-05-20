const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database');


const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

sequelize.authenticate()
  .then(() => console.log('Banco conectado com sucesso!'))
  .catch((err) => console.error('Erro ao conectar no banco:', err));


sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});
