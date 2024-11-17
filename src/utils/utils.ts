export function compareArray(array1: string[], array2: string[]): boolean {
    array1.sort();
    array2.sort();
    const arrayEquality = array1.length === array2.length && array1.every((value: any, index: any) => value === array2[index]);
    return arrayEquality;
}

export function getArrayFromJson(jsonObject: any[]) {
    const arrayValue:any[] = Object.values(jsonObject).sort();
    return arrayValue;
}
