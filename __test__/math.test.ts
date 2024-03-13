import { app } from '..';
/** @format */
import {
	addTwoNumbers,
	divideTwoNumbers,
	powerTwoNumbers,
	multiplyTwoNumbers,
	subtractTwoNumbers,
} from '../math.handler';

import request from 'supertest';

/*
This file includes a battery of test for the math library we created. Using
Jest, we can describe a group of tests and run them.

@see Jest's Docs: https://jestjs.io/
*/

// 'describe' groups tests so that they appear together when ran
describe('test math handler', (): void => {
	// The test function will execute the closure given watching for any errors
	// thrown
	test('add two numbers', (): void => {
		// This test is simple, what we want to know is if the number 29 and the
		// number 3 using this function will result in the number 32. This is a
		// very crude test to test our function as it could just be always giving
		// out the number 32!
		let a = 29,
			b = 3;
		let result = addTwoNumbers(a, b);
		// The expect function will return a Jest object with the result we gave it
		// to actually test if the result we gave it is what we want, we need to use
		// the `toBe` method of the object to assert equality. If the values are not
		// equal, an error will be thrown, shown in the Jest cli
		expect(result).toBe(32);
		// In reality, the 'add two numbers' test would be a group of tests, for
		// edge cases, like adding negative numbers, adding numbers with different
		// signs, adding floating point numbers, adding NaN numbers, adding
		// infinities, passing strings into the parameters or other types.
	});

	// The following tests have been collapsed for brevety
	test('divide two numbers', (): void => {
		expect(divideTwoNumbers(10, 2)).toBe(5);
		expect(divideTwoNumbers(1, 0)).toBe(NaN);
	});

	test('sub two numbers', (): void => {
		expect(subtractTwoNumbers(5, 3)).toBe(2);
	});
	test('test sum json response normalization', async(): Promise<void> => {
		const expected = {"message":"Sum Operation","operation":"success","a":"1","b":"1","sum":2}
		const resSum = await request(app).get("/sum/1/1")
		expect(resSum.body).toEqual(expected)
	});
	test('test subtract json response normalization', async(): Promise<void> => {
		const expected = {"message":"Subtract Operation","operation":"success","a":"5","b":"5","c":0}
		const resDiv = await request(app).get("/subtract/5/5")
		expect(resDiv.body).toEqual(expected)
	});
	test('test division json response normalization', async(): Promise<void> => {
		const expected = {"message":"Div Operation","operation":"success","a":"5","b":"5","c":1}
		const resDiv = await request(app).get("/div/5/5")
		expect(resDiv.body).toEqual(expected)
	});
	test('power two numbers', (): void => {
		expect(powerTwoNumbers(10, 25)).toBe(10000000000000000000000000);
	});

	test('multiply two numbers', (): void => {
		expect(multiplyTwoNumbers(2, 3)).toBe(6);
	});
});
