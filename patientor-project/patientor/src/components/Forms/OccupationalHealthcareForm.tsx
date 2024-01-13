import { Props } from './BaseEntryForm';
import { TextField } from '@mui/material';

const OccupationalHealthcareForm = ({ form, setForm }: Props) => {
    return (
        <div>
            <TextField
                variant='standard'
                label='Employer Name'
                fullWidth
                value={form.employerName}
                onChange={({ target }) =>
                    setForm({ ...form, employerName: target.value })
                }
            />
            <div>
                <p>Sickleave</p>
                <label>
                    {`start date `}
                    <input
                        style={{ marginRight: '15px' }}
                        type='date'
                        id='start'
                        name='start-date'
                        value={form.sickLeave.startDate}
                        onChange={({ target }) =>
                            setForm({
                                ...form,
                                sickLeave: {
                                    startDate: target.value,
                                    endDate: form.sickLeave.endDate,
                                },
                            })
                        }
                    />
                </label>

                <label>
                    {`end date `}
                    <input
                        type='date'
                        id='end'
                        name='end-date'
                        value={form.sickLeave.endDate}
                        onChange={({ target }) =>
                            setForm({
                                ...form,
                                sickLeave: {
                                    startDate: form.sickLeave.startDate,
                                    endDate: target.value,
                                },
                            })
                        }
                    />
                </label>
            </div>
        </div>
    );
};

export default OccupationalHealthcareForm;
