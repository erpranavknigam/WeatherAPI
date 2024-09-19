# Weather API

---------------------------------------------------------------------------------------------
A simple weather API built with Node.js and Express, utilizing Redis for caching and Axios for making HTTP requests to fetch weather data.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Rate Limiting](#rate-limiting)
- [Caching with Redis](#caching-with-redis)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Features

- Fetch weather data for a specified city.
- Caching with Redis to optimize performance and reduce API calls.
- Rate limiting to prevent abuse of the API.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Redis server running
- Access to the weather API service (Visual Crossing)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/erpranavknigam/weatherapi.git
   cd <your-repository>
   ```
2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a .env file in the root directory and add your environment variables (see below).

## Environment Variables

    Create a .env file in the root of your project and add the following:
    ```bash
    API_KEY=your_visual_crossing_api_key
    REDIS_URL=redis://localhost:6379
    PORT=5000
    ```
## Usage

To start the server, run:
```
npm start
```
The server will start on the specified port (default is 5000). You can then make requests to the API.


## Rate Limiting

The API includes a rate limiter that restricts requests to 100 per 15 minutes per IP. If the limit is exceeded, a 409 Conflict response will be returned with a message indicating that the limit has been reached.

## Caching with Redis

The API uses Redis to cache weather data for 12 hours (43200 seconds). If a request for weather data is made for a city that has been cached, the API will return the cached data instead of making a new request to the weather service.

## API Endpoints
1. Get Weather Data

    * Endpoint: /api/v1/weather/:city
    * Method: GET
    * Description: Fetches weather data for the specified city.
    * Parameters:
        city: The name of the city you want to fetch the weather for.

    * Example Request
    ```
    GET /api/v1/weather/hyderabad
    ```
