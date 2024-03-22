import * as express from 'express';
import {
  addTwoNumbers,
  divideTwoNumbers,
  powerTwoNumbers,
  multiplyTwoNumbers,
  subtractTwoNumbers,
} from './math.handler';

const app: express.Application = express();

interface Operations {
  [key: string]: (a: number, b: number) => number;
}

const operations: Operations = {
  'add': addTwoNumbers,  // Ensure your math handlers are properly typed in their respective files
  'div': divideTwoNumbers,
  'subtract': subtractTwoNumbers,
  'multiply': multiplyTwoNumbers,
  'power': powerTwoNumbers,
};

const validateNumbers = (a: string, b: string, res: express.Response): boolean => {
  const numRegex: RegExp = /^-?\d+\.?\d*$/;
  if (!numRegex.test(a) || !numRegex.test(b)) {
    res.status(400).json({ error: 'Invalid input, numbers required.' });
    return false;
  }
  return true;
};

app.get('/:operation/:a/:b', (req: express.Request, res: express.Response) => {
  const { operation, a, b } = req.params;

  const operationFunction = operations[operation];
  if (!operationFunction) {
    res.status(404).json({ error: 'Operation not supported.' });
    return;
  }

  if (!validateNumbers(a, b, res)) return;
  if (operation === 'div' && Number(b) === 0) {
    res.status(400).json({ error: 'Division by zero is not allowed.' });
    return;
  }

  const result: number = operationFunction(Number(a), Number(b));
  res.json({
    message: `${operation.charAt(0).toUpperCase() + operation.slice(1)} Operation`,
    operation: 'success',
    a,
    b,
    result,
  });
});

app.get('/', (_req: express.Request, res: express.Response) => {
  res.json({
    message: 'Welcome to the Math API',
    endpoints: Object.keys(operations).map((op: string) => ({
      path: `/${op}/:a/:b`,
      description: `Performs the ${op} operation on two numbers.`,
    })),
  });
});

export { app };
