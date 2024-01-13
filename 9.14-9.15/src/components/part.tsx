import { CoursePart } from '../types';

const partStyle = {
    border: 'solid black 1px',
    borderRadius: '10px',
    margin: '10px',
    padding: '10px',
};

const Part = ({ part }: { part: CoursePart }) => {
    const base = () => (
        <h3>
            {part.name} {part.exerciseCount}
        </h3>
    );

    switch (part.kind) {
        case 'basic':
            return (
                <div style={partStyle}>
                    {base()}
                    <i>{part.description}</i>
                </div>
            );
            break;
        case 'group':
            return (
                <div style={partStyle}>
                    {base()}
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            );
        case 'background':
            return (
                <div style={partStyle}>
                    {base()}
                    <i>{part.description}</i>
                    <p>{part.backgroundMaterial}</p>
                </div>
            );
        case 'special':
            return (
                <div style={partStyle}>
                    {base()}
                    <i>{part.description}</i>
                    <p>required skills: </p>
                    <ul>
                        {part.requirements.map((r, i) => (
                            <li key={i}>{r}</li>
                        ))}
                    </ul>
                </div>
            );
    }
};

export default Part;
