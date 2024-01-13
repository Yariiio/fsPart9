import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
    NonSensitivePatient,
    Patient,
    NewPatient,
    EntryWithoutId,
    Entry,
} from '../types';

const getAll = (): Patient[] => {
    return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, occupation, gender, dateOfBirth, name }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth,
    }));
};

const addPatient = (patientObj: NewPatient): NewPatient => {
    const newPatient = {
        id: uuid(),
        ...patientObj,
    };
    patientData.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient => {
    const foundPatient = patientData.find((p) => p.id === id);
    if (!foundPatient) {
        throw new Error('Patient not found');
    }
    return foundPatient;
};

const addEntry = (entryObject: EntryWithoutId, entries: Entry[]): Entry => {
    const newEntry = {
        id: uuid(),
        ...entryObject,
    };
    entries.push(newEntry);
    return newEntry;
};

export default {
    getAll,
    getNonSensitivePatients,
    addPatient,
    getPatient,
    addEntry,
};
