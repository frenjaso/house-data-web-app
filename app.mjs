import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routes from './routes.mjs';

const app = express();

// Set up the view engine and views directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Use the routes middleware
app.use('/', routes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});