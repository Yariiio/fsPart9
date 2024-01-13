import axios from 'axios';
import { Diary } from '../types';

const baseUrl = 'http://localhost:3003/api/diaries';

const getDiaries = async () => {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
};

const addDiary = async (diary: Diary) => {
    const response = await axios.post(baseUrl, diary);
    return response.data;
};

export default { getDiaries, addDiary };
