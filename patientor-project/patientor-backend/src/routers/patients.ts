import express from 'express';
import patientService from '../services/patientService';
import toNowPatient, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post('/', (_req, res) => {
    try {
        const patient = toNowPatient(_req.body);
        const addedPatient = patientService.addPatient(patient);
        res.json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({
                error: error.message,
            });
        }
    }
});

router.get('/:id', (_req, res) => {
    try {
        const id = _req.params.id;
        const patient = patientService.getPatient(id);
        res.status(200).json(patient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({
                error: error.message,
            });
        }
    }
});

router.post('/:id/entries', (_req, res) => {
    try {
        const patient = patientService.getPatient(_req.params.id);
        const entry = toNewEntry(_req.body);
        res.json(patientService.addEntry(entry, patient.entries));
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

export default router;
