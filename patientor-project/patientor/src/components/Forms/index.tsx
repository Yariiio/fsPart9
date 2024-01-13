import React from 'react';
import { useState } from 'react';

import { Button, Alert, FormControl, Stack } from '@mui/material';
import { Diagnosis, EntryWithoutId, Patient } from '../../types';

import entryService from '../../services/entries';
import axios from 'axios';
import BaseEntryForm from './BaseEntryForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import HealthCheckForm from './HealthCheck';

const formStyle = {
    border: 'dotted black 2px',
    padding: '15px',
    margin: '10px',
    width: '75%',
};

interface Props {
    patient: Patient;
    setPatient: React.Dispatch<React.SetStateAction<Patient>>;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    diagnoses: Diagnosis[];
}

const EntryForm = ({ setFormOpen, patient, setPatient, diagnoses }: Props) => {
    const [form, setForm] = useState({
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [''],
        type: 'Hospital',
        employerName: '',
        sickLeave: {
            startDate: '',
            endDate: '',
        },
        discharge: {
            date: '',
            criteria: '',
        },
        healthCheckRating: '0',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const addEntry = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        let newEntry = {
            type: form.type,
            description: form.description,
            date: form.date,
            specialist: form.specialist,
            diagnosisCodes: form.diagnosisCodes,
        } as EntryWithoutId;

        try {
            if (form.type === 'HealthCheck') {
                newEntry = {
                    ...newEntry,
                    healthCheckRating: Number(form.healthCheckRating),
                };
            }
            if (form.type === 'OccupationalHealthcare') {
                newEntry = {
                    ...newEntry,
                    employerName: form.employerName,
                    sickLeave: form.sickLeave,
                };
            }
            if (form.type === 'Hospital') {
                newEntry = {
                    ...newEntry,
                    discharge: form.discharge,
                };
            }

            const addedEntry = await entryService.createEntry(
                newEntry,
                patient
            );

            setPatient({
                ...patient,
                entries: patient.entries?.concat(addedEntry),
            });

            setFormOpen(false);
        } catch (error: unknown) {
            if (axios.AxiosError) {
                setIsError(true);
                setErrorMessage(error?.response.data.error);
                setTimeout(() => {
                    setErrorMessage('');
                    setIsError(false);
                }, 5000);
            }
        }
    };

    return (
        <div>
            {isError && <Alert severity='error'>{errorMessage}</Alert>}

            <FormControl style={formStyle}>
                <BaseEntryForm
                    form={form}
                    setForm={setForm}
                    diagnoses={diagnoses}
                />
                {form.type === 'Hospital' && (
                    <HospitalForm form={form} setForm={setForm} />
                )}

                {form.type === 'OccupationalHealthcare' && (
                    <OccupationalHealthcareForm form={form} setForm={setForm} />
                )}

                {form.type === 'HealthCheck' && (
                    <HealthCheckForm form={form} setForm={setForm} />
                )}

                <Stack direction='row' justifyContent='space-between'>
                    <Button
                        onClick={() => setFormOpen(false)}
                        color='error'
                        variant='contained'
                    >
                        cancel
                    </Button>
                    <Button
                        type='submit'
                        color='success'
                        variant='contained'
                        onClick={addEntry}
                    >
                        add
                    </Button>
                </Stack>
            </FormControl>
        </div>
    );
};

export default EntryForm;
