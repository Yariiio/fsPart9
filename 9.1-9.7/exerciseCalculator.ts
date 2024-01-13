export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

//utility functions
const calculateAverage = (numbers: number[]): number => {
    return numbers.reduce((a, c) => a + c) / numbers.length;
};

const ratingNum = (target: number, average: number): number => {
    if (average < target / 2) return 1;
    else if (average >= target) return 3;
    else return 2;
};

const ratingMessage = (rating: number): string => {
    let message = '';
    switch (rating) {
        case 1:
            message = 'you did not try!';
            break;
        case 2:
            message = 'not too bad but could be better';
            break;
        case 3:
            message = 'You did it!';
            break;
    }
    return message;
};

//This is for command line usage
const parseExercises = (args: string[]) => {
    const array = args.slice(2);
    if (array.length < 2) throw new Error('not enough arguments');
    if (array.map((a) => Number(a)).includes(NaN))
        throw new Error('arguments must be numbers');
    else {
        return array.map((a) => Number(a));
    }
};

export const calculateExercises = (
    exerciseHours: number[],
    target: number
): Result => {
    const hours = exerciseHours;
    const periodLength = hours.length;
    const trainingDays = hours.filter((e) => e > 0).length;
    const average = calculateAverage(hours);
    const success = average >= target;
    const rating = ratingNum(target, average);
    const ratingDescription = ratingMessage(rating);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

try {
    const parsedArray = parseExercises(process.argv);
    const result = calculateExercises(parsedArray.slice(1), parsedArray[0]);
    console.log(result);
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
