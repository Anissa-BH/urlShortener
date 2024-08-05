# URL Shortener
_A simple URL shortener service built with Express and MongoDB._

## Description

This is a URL shortening service that allows users to shorten long URLs into shorter, more manageable links. It is built with Node.js, Express, and MongoDB. The service provides basic URL shortening, redirection, and analytics for tracking URL clicks.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)



## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/anissa-bh/urlShortener.git
   ```

2. Navigate into the project directory:
   ```bash
   cd urlShortener
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npx tsc
   node dist/server.ts
   ```

## Usage

Once the application is running, you can use the following endpoints:

- **POST /api/shorturl**
  - Request Body: `{ "originalUrl": "http://example.com" }`
  - Response: `{ "originalUrl": "http://example.com", "shortUrl": "short123" }`

- **GET /api/shorturl/:shortUrl**
  - Redirects to the original URL for the given short URL.

- **GET /api/shorturl/analytics**
  - Response: Returns analytics data including the original URL, short URL, and click counts.


## API Endpoints

### Create Short URL
- **URL:** `/api/shorturl`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "originalUrl": "http://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "originalUrl": "http://example.com",
    "shortUrl": "short123"
  }
  ```

### Redirect to Original URL
- **URL:** `/api/shorturl/:shortUrl`
- **Method:** `GET`
- **Response:** Redirects to the original URL.

### Get Analytics
- **URL:** `/api/shorturl/analytics`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "originalUrl": "http://example.com",
      "shortUrl": "short123",
      "clicks": 10
    }
  ]
  ```
## Testing

To run the tests for this project, use the following command:

```bash
npm test
