import { differenceInMonths, format, startOfToday } from "date-fns";

export function formatBirthday(birthday: Date) {
    return format(birthday, 'MMM d, yyyy')
}

export function getDisplayAge (birthday: Date, comparisonBirthday?: Date) {
    if (comparisonBirthday && isValidDate(comparisonBirthday)) {
        const ageInMonths = differenceInMonths(comparisonBirthday, birthday);
        return getRelativeDisplayAge(ageInMonths);
    } else {
        const ageInMonths = differenceInMonths(startOfToday(), birthday);
        return getAbsoluteDisplayAge(ageInMonths);
    }
}

function isValidDate(date: Date) {
    return !isNaN(date.valueOf());
}

function getRelativeDisplayAge(ageInMonths: number) {
    if (ageInMonths == 0) {
        return "----"
    } else if (Math.abs(ageInMonths) < 24) {
        return (ageInMonths>0 ? '+': '') + ageInMonths + " month" + (Math.abs(ageInMonths) > 1 ? 's' : '');
    } else {
        const ageInYears = Math.floor(ageInMonths / 12);
        return (ageInYears>0 ? '+': '') + ageInYears + " year" + (Math.abs(ageInYears) > 1 ? 's' : '');
    }
}

function getAbsoluteDisplayAge(ageInMonths: number) {
    if (ageInMonths < 24) {
        return ageInMonths + " month" + (Math.abs(ageInMonths) > 1 ? 's' : '') + " old";
    } else {
        const ageInYears = Math.floor(ageInMonths / 12);
        return ageInYears + " years old";
    }
}
