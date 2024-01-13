import express from 'express';
import diagnosesRouter from './routers/diagnoses';
import patientsRouter from './routers/patients';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('pong');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
