require("dotenv").config();

const express = require('express');
const connectDB = require('./db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// To remove CROS (cross-resource-origin-platform) problem
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // to allow all client we use *
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS,GET,POST,PUT,PATCH,DELETE"
    ); //these are the allowed methods
    res.setHeader("Access-Control-Allow-Headers", "*"); // allowed headers (Auth for extra data related to authoriaztion)
    next();
});

app.get('/', (req, res, ) => {
    res.send('API of DIH App is running successfully');
});


// Define Routes
app.use('/api/v1', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));