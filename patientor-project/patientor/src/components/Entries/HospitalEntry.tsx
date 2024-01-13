import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import { Entry } from '../../types';

const HospitalEntry = ({ entry }: { entry: Entry }) => {
    if (entry && entry.type === 'Hospital') {
        return (
            <div>
                <p>
                    {entry.date} <LocalHospitalIcon />
                </p>
                <i>{entry.description}</i>
                <br />

                <p>diagnose by {entry.specialist}</p>
            </div>
        );
    }
};

export default HospitalEntry;
