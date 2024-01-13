import { Entry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
    if (entry && entry.type === 'OccupationalHealthcare') {
        return (
            <div>
                <p>
                    {entry.date} <WorkIcon /> {entry.employerName}
                </p>
                <i>{entry.description}</i>
                <p>diagnose by {entry.specialist}</p>
            </div>
        );
    }
};

export default OccupationalHealthcareEntry;
