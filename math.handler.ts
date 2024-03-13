/**
 * This file contains our wonderful maths library
 *
 * @format
 * @see Math documentation: https://en.wikipedia.org/wiki/Mathematics
 */

const addTwoNumbers = (a: number, b: number): number => a + b;

const divideTwoNumbers = (a: number, b: number): number => {
	if (b == 0) return NaN;
	return a / b;
};

const subtractTwoNumbers = (a: number, b: number): number => a - b;

export { addTwoNumbers, divideTwoNumbers, subtractTwoNumbers };
