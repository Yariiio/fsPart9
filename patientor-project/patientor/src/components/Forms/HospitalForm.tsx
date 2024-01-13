import { Props } from './BaseEntryForm';
import { TextField } from '@mui/material';

const HospitalForm = ({ form, setForm }: Props) => {
    return (
        <div>
            <p>Discharge</p>
            <div
                style={{
                    paddingLeft: '20px',
                    marginBottom: '15px',
                }}
            >
                <label>
                    {`date `}
                    <input
                        style={{ marginRight: '15px' }}
                        type='date'
                        id='dischargeDate'
                        name='discharge-date'
                        value={form.discharge.date}
                        onChange={({ target }) =>
                            setForm({
                                ...form,
                                discharge: {
                                    date: target.value,
                                    criteria: form.discharge.criteria,
                                },
                            })
                        }
                    />
                </label>

                <TextField
                    variant='standard'
                    label='criteria'
                    fullWidth
                    value={form.discharge.criteria}
                    onChange={({ target }) =>
                        setForm({
                            ...form,
                            discharge: {
                                date: form.discharge.date,
                                criteria: target.value,
                            },
                        })
                    }
                />
            </div>
        </div>
    );
};

export default HospitalForm;
