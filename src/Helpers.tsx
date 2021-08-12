export const padZero = (number: number): string => {
    let stringOutput = number.toString();
    if(stringOutput.length < 2){
        stringOutput = "0" + stringOutput;
    }
    return stringOutput;
}

export const getTotalMinutes = (date: Date): number => {
    return date.getHours() * 60 + date.getMinutes();
}