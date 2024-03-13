import * as express from 'express';
import {
  addTwoNumbers,
  divideTwoNumbers,
  powerTwoNumbers,
  multiplyTwoNumbers,
  subtractTwoNumbers,
} from './math.handler';

const app = express();

const operations = {
  'sum': addTwoNumbers,
  'div': divideTwoNumbers,
  'subtract': subtractTwoNumbers,
  'multiply': multiplyTwoNumbers,
  'power': powerTwoNumbers,
};

// A helper function for validating numeric input
const validateNumbers = (a: string, b: string, res: express.Response): boolean => {
  if (isNaN(Number(a)) || isNaN(Number(b))) {
    res.status(400).json({ error: 'Invalid input, numbers required.' });
    return false;
  }
  return true;
};

app.get('/:operation/:a/:b', (req: express.Request, res: express.Response) => {
  const { operation, a, b } = req.params;

  if (!validateNumbers(a, b, res)) return;
  if (operation === 'div' && Number(b) === 0) {
    res.status(400).json({ error: 'Division by zero is not allowed.' });
    return;
  }
  const operationFunction = operations[operation];
  if (!operationFunction) {
    res.status(404).json({ error: 'Operation not supported.' });
    return;
  }

  const result = operationFunction(Number(a), Number(b));
  res.json({
    message: `${operation.charAt(0).toUpperCase() + operation.slice(1)} Operation`,
    operation: 'success',
    a,
    b,
    result,
  });
});

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the Math API',
    endpoints: Object.keys(operations).map(op => ({
      path: `/${op}/:a/:b`,
      description: `Performs the ${op} operation on two numbers.`,
    })),
  });
});

export { app };
