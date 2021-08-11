export const padZero = (number: number): string => {
    let stringOutput = number.toString();
    if(stringOutput.length < 2){
        stringOutput = "0" + stringOutput;
    }
    return stringOutput;
}

export const getHalfHourSlicesFloor = (date: Date): number => {
    return date.getHours() * 2 + Math.floor(date.getMinutes() / 30);;
}

export const getHalfHourSlicesCeil = (date: Date): number => {
    return date.getHours() * 2 + Math.ceil(date.getMinutes() / 30);;
}

export const getTotalMinutes = (date: Date): number => {
    return date.getHours() * 60 + date.getMinutes();
}