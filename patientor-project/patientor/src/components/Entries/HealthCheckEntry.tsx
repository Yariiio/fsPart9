import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry } from '../../types';

const HealthCheckEntry = ({ entry }: { entry: Entry }) => {
    if (entry && entry.type === 'HealthCheck') {
        const heartColor = () => {
            if (entry.healthCheckRating === 0) {
                return 'success';
            }
            if (entry.healthCheckRating === 1) {
                return 'secondary';
            }
            if (entry.healthCheckRating === 2) {
                return 'primary';
            }
            if (entry.healthCheckRating === 3) {
                return 'action';
            }
        };

        return (
            <div>
                <p>
                    {entry.date} <MedicalServicesIcon />
                </p>
                <i>{entry.description}</i> <br />
                <FavoriteIcon color={heartColor()} />
                <p>diagnose by {entry.specialist}</p>
            </div>
        );
    }
};

export default HealthCheckEntry;
