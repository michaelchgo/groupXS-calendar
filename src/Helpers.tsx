export const padZero = (number: number): string => {
    let stringOutput = number.toString();
    if(stringOutput.length < 2){
        stringOutput = "0" + stringOutput;
    }
    return stringOutput;
}

export const getHalfHourSlices = (date: Date): number => {
    let halfHourSlices = date.getHours() * 2;
    if(date.getMinutes() >= 30) {
        halfHourSlices ++;
    }

    return halfHourSlices;
}