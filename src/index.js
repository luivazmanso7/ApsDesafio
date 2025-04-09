import express from 'express';
import router from './routes/clientRoutes.js';

const app = express();
app.use(express.json());
app.use(router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));