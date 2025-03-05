# meli-backend

## Overview

The meli-backend project is a TypeScript-based backend application designed to interact with the Mercado Livre API. It implements a clean architecture pattern, separating concerns into distinct layers: application, domain, infrastructure, and presentation.

## Project Structure

```
meli-backend
├── src
│   ├── application       # Use cases and application services
│   ├── domain            # Domain entities and interfaces
│   ├── infrastructure     # External API communication and persistence
│   ├── presentation      # REST API controllers
│   ├── tests             # Unit and end-to-end tests
│   ├── main.ts           # Application entry point
│   ├── app.module.ts     # Root module
├── package.json          # NPM dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**

   ```
   git clone https://github.com/yourusername/meli-backend.git
   cd meli-backend
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables, such as API keys and database connection strings.

4. **Run the application:**
   ```
   npm start
   ```

## Usage

The application exposes REST API endpoints for product-related operations. You can use tools like Postman or curl to interact with the API.

### Endpoints

- `GET /products/:id` - Retrieve a product by its ID.
- `GET /products/search` - Search for products based on a query.

## Testing

To run the tests, use the following command:

```
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
