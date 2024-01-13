/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
const app = express();
app.use(express.json());
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
    const query = _req.query;
    if (
        !(query.height && query.weight) ||
        isNaN(Number(query.height)) ||
        isNaN(Number(query.weight))
    ) {
        res.json({ error: 'malformatted parameters' });
    } else {
        const w = Number(query.weight);
        const h = Number(query.height);
        const bmi = calculateBmi(h, w);
        res.json({ height: h, weight: w, bmi });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!(daily_exercises && target)) {
        res.json({ error: 'parameters missing' });
    }
    if (isNaN(Number(target))) {
        res.status(400).json({ error: 'malformatted parameters' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        daily_exercises.every(
            (e: unknown) => !Number.isNaN(e) && e !== true && e !== false
        )
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const parsedExercises = daily_exercises.map((e: unknown) => Number(e));
        const result = calculateExercises(
            parsedExercises as number[],
            Number(target)
        );
        res.json({ result });
    } else {
        res.status(400).json({ error: ' malformatted parameters' });
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
