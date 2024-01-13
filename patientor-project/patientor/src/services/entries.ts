import axios from 'axios';
import { EntryWithoutId, Entry, Patient } from '../types';

import { apiBaseUrl } from '../constants';

const createEntry = async (entry: EntryWithoutId, patient: Patient) => {
    const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        entry
    );
    return data;
};

export default { createEntry };
