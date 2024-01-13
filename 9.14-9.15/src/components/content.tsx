import { CoursePart } from '../types';
import Part from './part';

const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
        <div>
            {parts.map((part, i) => (
                <Part part={part} key={i} />
            ))}
        </div>
    );
};

export default Content;
