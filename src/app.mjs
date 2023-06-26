import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routes from './routes.mjs';

const app = express();

// Set up the view engine and views directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("__dirname: " + __dirname)

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use('/jason', express.static(`${__dirname}/node_modules/chart.js/auto/`));


// Use the routes middleware
app.use('/', routes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});