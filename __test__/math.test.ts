import {
	addTwoNumbers,
	divideTwoNumbers,
	subtractTwoNumbers
} from '../math.handler';

describe('test math handler', (): void => {
	test('add two numbers', (): void => {
		expect(addTwoNumbers(29, 3)).toBe(32);
	});

	test('divide two numbers', (): void => {
		expect(divideTwoNumbers(10, 2)).toBe(5);
	});

	test('sub two numbers', (): void => {
		expect(subtractTwoNumbers(5, 3)).toBe(2);
	});
});
