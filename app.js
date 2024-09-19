const express = require('express')
const dotenv = require('dotenv')
const routes = require('./routes/weatherRoutes')
dotenv.config()

const app = express()

app.use('/api/v1', routes)


const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);

