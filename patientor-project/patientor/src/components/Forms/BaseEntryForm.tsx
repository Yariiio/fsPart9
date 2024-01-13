import { Select, TextField, MenuItem } from '@mui/material';
import React from 'react';
import { Diagnosis } from '../../types';
import { Theme, useTheme } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useEffect } from 'react';

export interface Props {
    diagnoses?: Diagnosis[];
    form: {
        description: string;
        date: string;
        specialist: string;
        type: string;
        diagnosisCodes: Array<Diagnosis['code']>;
        employerName: string;
        sickLeave: {
            startDate: string;
            endDate: string;
        };
        discharge: {
            date: string;
            criteria: string;
        };
        healthCheckRating: string;
    };
    setForm: React.Dispatch<
        React.SetStateAction<{
            description: string;
            date: string;
            specialist: string;
            type: string;
            diagnosisCodes: Array<Diagnosis['code']>;
            employerName: string;
            sickLeave: {
                startDate: string;
                endDate: string;
            };
            discharge: {
                date: string;
                criteria: string;
            };
            healthCheckRating: string;
        }>
    >;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const BaseEntryForm = ({ form, setForm, diagnoses }: Props) => {
    const theme = useTheme();
    const [code, setCode] = React.useState<string[]>([]);

    useEffect(() => {
        setForm({ ...form, diagnosisCodes: code });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    const handleCodeChange = (event: SelectChangeEvent<typeof code>) => {
        const {
            target: { value },
        } = event;
        setCode(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <>
            <h4>{`New ${form.type} Entry`}</h4>
            <p>Form Type</p>
            <Select
                labelId='type-input-label'
                id='typeId'
                value={form.type}
                label='Type'
                onChange={(event) =>
                    setForm({ ...form, type: event.target.value })
                }
            >
                <MenuItem value={'Hospital'}>Hospital</MenuItem>
                <MenuItem value={'OccupationalHealthcare'}>
                    OccupationalHealthcare
                </MenuItem>
                <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
            </Select>

            <TextField
                variant='standard'
                label='Description'
                value={form.description}
                onChange={({ target }) =>
                    setForm({ ...form, description: target.value })
                }
            />
            <label>
                {`Date `}
                <input
                    style={{ marginTop: '20px' }}
                    type='date'
                    id='date'
                    name='Date'
                    value={form.date}
                    onChange={({ target }) =>
                        setForm({ ...form, date: target.value })
                    }
                />
            </label>

            <TextField
                variant='standard'
                label='Specialist'
                fullWidth
                value={form.specialist}
                onChange={({ target }) =>
                    setForm({ ...form, specialist: target.value })
                }
            />

            <div>
                <p>Code</p>
                <Select
                    labelId='multiple-code-label'
                    id='multiple-code'
                    multiple
                    fullWidth
                    value={code}
                    onChange={handleCodeChange}
                    input={<OutlinedInput label='Code' />}
                    MenuProps={MenuProps}
                >
                    {diagnoses &&
                        diagnoses
                            .map((d) => d.code)
                            .map((c) => (
                                <MenuItem
                                    key={c}
                                    value={c}
                                    style={getStyles(c, code, theme)}
                                >
                                    {c}
                                </MenuItem>
                            ))}
                </Select>
            </div>
        </>
    );
};

export default BaseEntryForm;
