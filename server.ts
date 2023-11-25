import dotenv from 'dotenv';
import { app } from './index';

/*
This file imports the actual routes from our index file

@see ./index.ts
*/

// Import .env file as enviroment variables
dotenv.config();

// Check which port the server should run on
const port = process.env.PORT || 8000;

// Listen on the port to accept http connections
app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`);
});
