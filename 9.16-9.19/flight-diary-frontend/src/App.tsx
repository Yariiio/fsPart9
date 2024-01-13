import { useState, useEffect } from 'react';
import { Diary } from './types';
import diaryService from './services/diaries';
import Diaries from './components/diaries';
import DiaryForm from './components/diaryForm';

function App() {
    const [diaries, setDiaries] = useState<Diary[]>([]);

    useEffect(() => {
        diaryService.getDiaries().then((data) => setDiaries(data));
    }, [diaries]);

    return (
        <div>
            <DiaryForm />
            <Diaries diaries={diaries} />
        </div>
    );
}

export default App;
