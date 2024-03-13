/** @format */

import express, { Express, Request, Response } from 'express';
// Import our library
import {
	addTwoNumbers,
	divideTwoNumbers,
	subtractTwoNumbers,
	powerTwoNumbers,
	multiplyTwoNumbers,
} from './math.handler';

/*
This file creates and sets up the routes available to the exposed http server
using express.js

@see Express.js Docs: http://expressjs.com/ 
*/

const ENDPOINTS = {
	"sum": {
		"method": "GET",
		"params": "/:a/:b",
		"example": {
			"request": "/sum/6/2",
		},
		"description": "Adds 2 numbers"
	},
	"div": {
		"method": "GET",
		"params": "/:a/:b",
		"example": {
			"request": "/div/6/2",
		},
		"description": "Divides a by b"
	},
	"subtract": {
		"method": "GET",
		"params": "/:a/:b",
		"example": {
			"request": "/subtract/6/2",
		},
		"description": "Subtracts b from a"
	},
	"multiply": {
		"method": "GET",
		"params": "/:a/:b",
		"example": {
			"request": "/multiply/6/2",
		},
		"description": "Multiply 2 numbers"
	},
}

// Create the Express application
const app: Express = express();

// This is how you setup a simple GET handler
app.get('/', (_req: Request, res: Response) => {
	// With express, we can respond with JSON directly without having to
	// `JSON.stringify()` response. You might want to do this if you're building
	// an API
	res.json({
		message: 'Hello World!',
		endpoints: ENDPOINTS
	});
});

// This GET route is very flexible, it will answer any request going to
// `/sum/*/*` and assign the wildcards into the parameters with the key given
app.get('/sum/:a/:b', (req: Request, res: Response) => {
	// Extract the request parameters
	const { a, b } = { a: req.params.a, b: req.params.b };
	// TODO: Error check `a` and `b` for non-numeric values
	// Run our sum function from the math library
	const sum = addTwoNumbers(Number(a), Number(b));
	// Respond in JSON
	res.json({
		message: 'Sum Operation',
		operation: 'success',
		a,
		b,
		sum,
	});
});

// Handler for the division route.
app.get('/div/:a/:b', (req: Request, res: Response) => {
	const { a, b } = { a: req.params.a, b: req.params.b };
	if (b == '0') {
		res.json({
			message: 'You cannot divide by zero',
			operation: 'failure',
			a,
			b,
		});
	} else {
		const division = divideTwoNumbers(Number(a), Number(b));
		res.json({
			message: 'Div Operation',
			operation: 'success',
			a,
			b,
			c: division,
		});
	}
});

// Handler for the subtraction route
app.get('/subtract/:a/:b', (req: Request, res: Response) => {
const { a, b } = { a: Number(req.params.a), b: Number(req.params.b) };
const subtraction = subtractTwoNumbers(Number(a), Number(b));
res.json({
message: 'Subtract Operation',
operation: 'success',
a,
b,
subtraction
});
});

// Handler for the exponencial route
app.get('/power/:a/:b', (req: Request, res: Response) => {
	const { a, b } = { a: Number(req.params.a), b: Number(req.params.b) };
	const exponencial = powerTwoNumbers(Number(a), Number(b));
	res.json({
		message: 'Power Operation',
		operation: 'success',
		a,
		b,
		exponencial,
	});
});
// Handler for the multiply endpoint
app.get('/multiply/:a/:b', (req: Request, res: Response) => {
	const { a, b } = { a: req.params.a, b: req.params.b };
	const multiplication = multiplyTwoNumbers(Number(a), Number(b));
	res.json({
		message: 'Multiply Operation',
		operation: 'success',
		a,
		b,
		c: multiplication,
	});
});

export { app };
