import * as express from 'express';
import {
  addTwoNumbers,
  divideTwoNumbers,
  powerTwoNumbers,
  multiplyTwoNumbers,
  subtractTwoNumbers,
} from './math.handler';

const app = express();

// A helper function for validating numeric input
const validateNumbers = (a: string, b: string, res: express.Response): boolean => {
  if (isNaN(Number(a)) || isNaN(Number(b))) {
    res.status(400).json({ error: 'Invalid input, numbers required.' });
    return false;
  }
  return true;
};

// A generic handler for all math operations
const mathOperationHandler = (operation: string) => (req: express.Request, res: express.Response) => {
  const { a, b } = req.params;

  if (!validateNumbers(a, b, res)) return;

  let result;
  switch (operation) {
    case 'sum':
      result = addTwoNumbers(Number(a), Number(b));
      break;
    case 'div':
      if (Number(b) === 0) {
        res.status(400).json({ error: 'Division by zero is not allowed.' });
        return;
      }
      result = divideTwoNumbers(Number(a), Number(b));
      break;
    case 'subtract':
      result = subtractTwoNumbers(Number(a), Number(b));
      break;
    case 'multiply':
      result = multiplyTwoNumbers(Number(a), Number(b));
      break;
    case 'power':
      result = powerTwoNumbers(Number(a), Number(b));
      break;
    default:
      res.status(404).json({ error: 'Operation not supported.' });
      return;
  }

  res.json({
    message: `${operation} Operation`,
    operation: 'success',
    a,
    b,
    result,
  });
};

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the Math API',
    endpoints: [
      { path: '/sum/:a/:b', description: 'Adds 2 numbers' },
      { path: '/div/:a/:b', description: 'Divides a by b' },
      { path: '/subtract/:a/:b', description: 'Subtracts b from a' },
      { path: '/multiply/:a/:b', description: 'Multiplies 2 numbers' },
      { path: '/power/:a/:b', description: 'Raises a to the power of b' },
    ],
  });
});

// Use the generic handler for all operations
app.get('/sum/:a/:b', mathOperationHandler('sum'));
app.get('/div/:a/:b', mathOperationHandler('div'));
app.get('/subtract/:a/:b', mathOperationHandler('subtract'));
app.get('/multiply/:a/:b', mathOperationHandler('multiply'));
app.get('/power/:a/:b', mathOperationHandler('power'));

export { app };
