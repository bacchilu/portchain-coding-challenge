import {chunkArray} from '.';

describe('chunkArray', () => {
    test('Should chunk an array into smaller arrays of the specified size', () => {
        const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const chunkSize = 3;

        const result = chunkArray(inputArray, chunkSize);
        expect(result).toEqual([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
    });

    test('Should chunk an array into smaller arrays of the specified size 2', () => {
        const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const chunkSize = 3;

        const result = chunkArray(inputArray, chunkSize);
        expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
    });

    test('Should handle an empty array', () => {
        const inputArray: number[] = [];
        const chunkSize = 2;

        const result = chunkArray(inputArray, chunkSize);
        expect(result).toEqual([]);
    });

    test('Should handle a chunk size larger than the array length', () => {
        const inputArray = [1, 2, 3, 4, 5];
        const chunkSize = 6;

        const result = chunkArray(inputArray, chunkSize);
        expect(result).toEqual([[1, 2, 3, 4, 5]]);
    });
});
