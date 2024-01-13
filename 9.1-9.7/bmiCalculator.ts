const printResults = (bmi: number): string => {
    let message = '';

    if (bmi < 16.0) {
        message = 'Underweight (Severe thinness)';
    } else if (bmi <= 16.9) {
        message = 'Underweight (Moderate thinness)';
    } else if (bmi <= 18.4) {
        message = 'Underweight (Mild thinness)';
    } else if (bmi <= 24.9) {
        message = 'Normal range';
    } else if (bmi <= 29.9) {
        message = 'Overweight (Pre-obese)';
    } else if (bmi <= 34.9) {
        message = 'Obese (Class I)';
    } else if (bmi <= 40.0) {
        message = 'Obese (Class II)';
    } else {
        message = 'Obese (Class III)';
    }
    return message;
};
interface Measurements {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): Measurements => {
    if (args.length < 4) throw new Error('not enough arguments');
    if (args.length > 4) throw new Error('too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    }
    throw new Error('Provided values must be numbers');
};

export const calculateBmi = (h: number, w: number): string => {
    const height = h / 100;
    const bmi = w / (height * height);
    return printResults(bmi);
};

try {
    const { height, weight } = parseArguments(process.argv);
    const bmi = calculateBmi(height, weight);
    console.log(bmi);
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
