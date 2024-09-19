const express = require('express');
const slowDown = require('express-slow-down');
const dotenv = require('dotenv');
const routes = require('./routes/weatherRoutes');
dotenv.config();

const app = express();

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: () => 500,
    outLimitReached: (req,res) => {
        res.status(409).json({messgae:"You have exceeded the maximum number of request, please try again after some time."})
    }
});

app.use('/api/v1', speedLimiter, routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
