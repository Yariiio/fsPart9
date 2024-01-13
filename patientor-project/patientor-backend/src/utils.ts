import {
    NewPatient,
    Gender,
    EntryWithoutId,
    Diagnosis,
    Discharge,
    SickLeave,
} from './types';

/** FOR STRING WITH SOME VALUE**/
const isString = (text: unknown): text is string => {
    return (
        (typeof text === 'string' && text.length > 0) ||
        (text instanceof String && text.length > 0)
    );
};

/**FOR PATIENT **/
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((g) => g.toString())
        .includes(param);
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect name');
    }
    return name;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('incorrect date');
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect occupation');
    }
    return occupation;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender');
    }
    return gender;
};

/**FOR ENTRIES **/
const parseDescription = (description: unknown): string => {
    if (!isString(description)) {
        throw new Error('Incorrect description');
    }
    return description;
};
const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) {
        throw new Error('Incorrect specialist');
    }
    return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (
        !object ||
        typeof object !== 'object' ||
        !('diagnosisCodes' in object)
    ) {
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

/**FOR HEALTHCHECK ENTRY **/
const isHealthCheckEntryType = (type: string): type is 'HealthCheck' => {
    return type === 'HealthCheck';
};

const parseHealthCheckEntryType = (type: unknown): string => {
    if (!isString(type) || !isHealthCheckEntryType(type)) {
        throw new Error('Incorrect Type');
    }
    return type;
};

const isHealthCheckRating = (param: number): boolean => {
    return param >= 0 && param <= 3;
};

const parseHealthCheckRating = (rating: unknown): number => {
    if (typeof rating !== 'number' || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect rating');
    }
    return rating;
};

/**FOR OCCUPATIONALHEALTH ENTRY**/
const isOccupationalHealthcareEntryType = (
    type: string
): type is 'HealthCheck' => {
    return type === 'OccupationalHealthcare';
};

const parseOccupationalHealthcareEntryType = (type: unknown): string => {
    if (!isString(type) || !isOccupationalHealthcareEntryType(type)) {
        throw new Error('Incorrect Type');
    }
    return type;
};

const parseEmployerName = (employer: unknown): string => {
    if (!isString(employer)) {
        throw new Error('Incorrect employer name');
    }
    return employer;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (
        !object ||
        typeof object !== 'object' ||
        !(
            'startDate' in object &&
            isString(object.startDate) &&
            isDate(object.startDate) &&
            'endDate' in object &&
            isString(object.endDate) &&
            isDate(object.endDate)
        )
    ) {
        return {} as SickLeave;
    }
    return object as SickLeave;
};

/**FOR HOSPITAL ENTRY**/
const isHospitalEntryType = (type: string): type is 'Hospital' => {
    return type === 'Hospital';
};

const parseHospitalEntryType = (type: unknown): string => {
    if (!isString(type) || !isHospitalEntryType(type)) {
        throw new Error('Incorrect Type');
    }
    return type;
};

const parseDischarge = (object: unknown): Discharge => {
    if (
        !object ||
        typeof object !== 'object' ||
        !(
            'date' in object &&
            isString(object.date) &&
            isDate(object.date) &&
            'criteria' in object &&
            isString(object.criteria)
        )
    ) {
        throw new Error('Incorrect Discharge details');
    }
    return object as Discharge;
};

/**CHECKING THAT PATIENT OBJECT HAS ALL FIELDS IN CORRECT FORM**/
const toNewPatient = (obj: unknown): NewPatient => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'name' in obj &&
        'dateOfBirth' in obj &&
        'ssn' in obj &&
        'gender' in obj &&
        'occupation' in obj
    ) {
        const patient = {
            name: parseName(obj.name),
            dateOfBirth: parseDate(obj.dateOfBirth),
            ssn: parseSsn(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseOccupation(obj.occupation),
            entries: [],
        };
        return patient;
    }
    throw new Error('missing fields');
};

/**CHECKING THAT ENTRIES HAVE CORRECT FIELDS FOR EACH TYPE**/
export const toNewEntry = (obj: unknown): EntryWithoutId => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'description' in obj &&
        'date' in obj &&
        'specialist' in obj &&
        'type' in obj
    ) {
        const entry = {
            description: parseDescription(obj.description),
            date: parseDate(obj.date),
            specialist: parseSpecialist(obj.specialist),
            diagnosisCodes: parseDiagnosisCodes(obj),
        };

        if (obj.type === 'HealthCheck' && 'healthCheckRating' in obj) {
            const healthCheckEntry = {
                ...entry,
                type: parseHealthCheckEntryType(obj.type),
                healthCheckRating: parseHealthCheckRating(
                    obj.healthCheckRating
                ),
            };
            return healthCheckEntry;
        }
        if (obj.type === 'OccupationalHealthcare' && 'employerName' in obj) {
            const OccupationalHealthcareEntry = {
                ...entry,
                type: parseOccupationalHealthcareEntryType(obj.type),
                employerName: parseEmployerName(obj.employerName),
                sickLeave:
                    'sickLeave' in obj
                        ? parseSickLeave(obj.sickLeave)
                        : ({} as SickLeave),
            };
            return OccupationalHealthcareEntry;
        }

        if (obj.type === 'Hospital' && 'discharge' in obj) {
            const HospitalEntry = {
                ...entry,
                type: parseHospitalEntryType(obj.type),

                discharge: parseDischarge(obj.discharge),
            };
            return HospitalEntry;
        }
    }

    throw new Error('missing fields from entry');
};

export default toNewPatient;
