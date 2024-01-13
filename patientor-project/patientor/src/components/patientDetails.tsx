import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { useEffect, useState } from 'react';
import { Patient, Diagnosis, Entry } from '../types';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import HospitalEntry from './Entries/HospitalEntry';
import OccupationalHealthcareEntry from './Entries/OccupationalHealthcareEntry';
import HealthCheckEntry from './Entries/HealthCheckEntry';

import EntryForm from './Forms';

const entryStyle = {
    margin: 10,
    padding: 10,
    border: '1px solid black',
    borderRadius: 10,
};

const PatientDetails = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
    const { id } = useParams();
    const [patient, setPatient] = useState({} as Patient);
    const [formOpen, setFormOpen] = useState(false);

    const gender = () => {
        switch (patient.gender) {
            case 'female':
                return <FemaleIcon />;
            case 'male':
                return <MaleIcon />;
            case 'other':
                return <p>other gender</p>;
        }
    };

    useEffect(() => {
        if (id) {
            patientService.getPatient(id).then((data) => setPatient(data));
        }
    }, [patient.entries?.length, id]);

    const assertNever = (value: unknown): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case 'Hospital':
                return <HospitalEntry entry={entry} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcareEntry entry={entry} />;
            case 'HealthCheck':
                return <HealthCheckEntry entry={entry} />;
            default:
                return assertNever(entry);
        }
    };

    if (patient) {
        return (
            <div>
                <h2>
                    {patient.name} {gender()}
                </h2>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                {formOpen && (
                    <EntryForm
                        patient={patient}
                        setFormOpen={setFormOpen}
                        setPatient={setPatient}
                        diagnoses={diagnoses}
                    />
                )}
                {patient.entries && patient.entries.length > 0 && (
                    <div>
                        <h3>Entries</h3>
                        {patient.entries.map((e) => (
                            <div key={e.id} style={entryStyle}>
                                <EntryDetails entry={e} />

                                <ul>
                                    {e.diagnosisCodes &&
                                        diagnoses
                                            .filter((d) =>
                                                e.diagnosisCodes?.includes(
                                                    d.code
                                                )
                                            )
                                            .map((d, i) => (
                                                <li key={i}>
                                                    {d.code} {d.name}
                                                </li>
                                            ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                <button onClick={() => setFormOpen(true)}>add entry</button>
            </div>
        );
    }
};

export default PatientDetails;
