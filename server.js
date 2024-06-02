const express = require('express');
const utils = require('./utils')
const app = express();
const port = 6969; // You can choose any port number
const path = require('path');

//psql
const { Pool } = require('pg');

const psql = new Pool({
    connectionString:utils.psql.psqlConnectionData.postgresUrlNoSsl,
});

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
    console.log(res.url);
    utils.homeFunctions.getHomePage(res);
});

// Route to handle user-related requests
app.use('/vav', require('./vav/vavServer')(psql));

// Catch-all route for unhandled URLs
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

