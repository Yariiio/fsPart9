import { Props } from './BaseEntryForm';
import { Select, MenuItem } from '@mui/material';

const HealthCheckForm = ({ form, setForm }: Props) => {
    return (
        <div>
            <Select
                labelId='HealthcheckRatingLabelId'
                id='HealthcheckRatingId'
                value={form.healthCheckRating}
                label='Healthcheck'
                onChange={(event) =>
                    setForm({ ...form, healthCheckRating: event.target.value })
                }
            >
                <MenuItem value={'0'}>Healthy</MenuItem>
                <MenuItem value={'1'}>Low Risk</MenuItem>
                <MenuItem value={'2'}>High Risk</MenuItem>
                <MenuItem value={'3'}>Critical Risk</MenuItem>
            </Select>
        </div>
    );
};

export default HealthCheckForm;
