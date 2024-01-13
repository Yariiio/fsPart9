//**** Diagnosis **** */

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
//****ENTRIES**** */

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: string;
    discharge: Discharge;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: string;
    employerName: string;
    sickLeave?: SickLeave;
}

export enum HealthCheckRating {
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3,
}

interface HealthCheckEntry extends BaseEntry {
    type: string;
    healthCheckRating: HealthCheckRating;
}

//**** PATIENTS**** */

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
    ? Omit<T, K>
    : never;
// Define Entry without the 'id' property

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type Entry =
    | HospitalEntry
    | HealthCheckEntry
    | OccupationalHealthcareEntry;
