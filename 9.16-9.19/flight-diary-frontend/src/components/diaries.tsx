import { Diary } from '../types';

const entryStyle = {
    padding: '10px',
    margin: '10px',
    border: 'solid black 1px',
};

const Diaries = ({ diaries }: { diaries: Diary[] }) => {
    return (
        <div>
            <h1>Diary entries</h1>
            {diaries.map((diary, i) => (
                <div key={i} style={entryStyle}>
                    <h3>{diary.date}</h3>
                    <p>visibility: {diary.visibility}</p>
                    <p>weather: {diary.weather}</p>
                </div>
            ))}
        </div>
    );
};

export default Diaries;
