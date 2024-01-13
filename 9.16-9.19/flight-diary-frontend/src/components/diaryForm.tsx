import { useState } from 'react';
import { Diary } from '../types';
import diaryService from '../services/diaries';
import { Error } from './error';
import axios from 'axios';

const DiaryForm = () => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('great');
    const [weather, setWeather] = useState('sunny');
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedVisibilityBtn, setSelectedVisibilityBtn] = useState('great');
    const [selectedWeatherBtn, setSelectedWeatherBtn] = useState('sunny');

    const isVisibilitySelected = (value: string): boolean => {
        return selectedVisibilityBtn === value;
    };

    const isWeatherSelected = (value: string): boolean => {
        return selectedWeatherBtn === value;
    };

    const handleVisibilityClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedVisibilityBtn(event.target.value);
        setVisibility(event.target.value);
    };

    const handleWeatherClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedWeatherBtn(event.target.value);
        setWeather(event.target.value);
    };

    const handleMessage = (message: string): void => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    };

    const handleReset = () => {
        setDate('');
        setVisibility('great');
        setWeather('sunny');
        setComment('');
        setSelectedVisibilityBtn('great');
        setSelectedWeatherBtn('sunny');
    };

    const createDiary = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const newDiary: Diary = {
                date,
                visibility,
                weather,
                comment,
            };

            await diaryService.addDiary(newDiary);
            handleReset();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                handleMessage(error.response?.data);
            }
        }
    };

    return (
        <div>
            <h2>Add new diary</h2>
            <Error message={errorMessage} />
            <form onSubmit={createDiary}>
                date
                <input
                    type='date'
                    name='date'
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <br />
                <div>
                    visibility: great
                    <input
                        type='radio'
                        name='visibility'
                        value='great'
                        checked={isVisibilitySelected('great')}
                        onChange={handleVisibilityClick}
                    />
                    good
                    <input
                        type='radio'
                        name='visibility'
                        value='good'
                        checked={isVisibilitySelected('good')}
                        onChange={handleVisibilityClick}
                    />
                    ok
                    <input
                        type='radio'
                        name='visibility'
                        value='ok'
                        checked={isVisibilitySelected('ok')}
                        onChange={handleVisibilityClick}
                    />
                    poor
                    <input
                        type='radio'
                        name='visibility'
                        value='poor'
                        checked={isVisibilitySelected('poor')}
                        onChange={handleVisibilityClick}
                    />
                </div>
                <div>
                    weather: sunny
                    <input
                        type='radio'
                        name='weather'
                        value='sunny'
                        checked={isWeatherSelected('sunny')}
                        onChange={handleWeatherClick}
                    />
                    rainy
                    <input
                        type='radio'
                        name='weather'
                        value='rainy'
                        checked={isWeatherSelected('rainy')}
                        onChange={handleWeatherClick}
                    />
                    cloudy
                    <input
                        type='radio'
                        name='weather'
                        value='cloudy'
                        checked={isWeatherSelected('cloudy')}
                        onChange={handleWeatherClick}
                    />
                    stormy
                    <input
                        type='radio'
                        name='weather'
                        value='stormy'
                        checked={isWeatherSelected('stormy')}
                        onChange={handleWeatherClick}
                    />
                    windy
                    <input
                        type='radio'
                        name='weather'
                        value='windy'
                        checked={isWeatherSelected('windy')}
                        onChange={handleWeatherClick}
                    />
                </div>
                <br />
                comment
                <input
                    type='text'
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
                <br />
                <button type='submit'>add</button>
            </form>
        </div>
    );
};

export default DiaryForm;
