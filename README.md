# Restaurants Review Backend

This is the backend repository for the Restaurants Review application. It provides the server-side functionality for managing restaurants, reviews, and users.

The API documentation for this backend can be found [here](https://sebastian-velasquez.dev/restaurants-reviews-backend).

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- Node.js v20 (Please ensure you have this version or compatible version installed)
- Express.js
- MongoDB
- JSDoc (for generating API documentation)

## Getting Started

To get started with the Restaurants Review Backend, follow the instructions below.

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/restaurants-review-backend.git

2. Navigate to the project directory:
    ```shell
    cd restaurants-review-backend

3. Install the dependencies:
    ```shell
    npm install    

## Configuration
Create a .env file in the project root directory.
Define the required environment variables in the .env file. You can refer to the .env.example file for the list of required variables.
## Usage
Ensure MongoDB is running on your system or provide the appropriate connection details in the .env file.

Start the server:
    ```shell
    npm start

The server should now be running on http://localhost:3000.

## API Documentation
The API documentation is automatically generated using JSDoc comments in the codebase. You can find the latest documentation here. It provides detailed information about the available endpoints, request/response structures, and error handling.

## Contributing
Contributions to the Restaurants Review Backend are welcome! If you find any issues or want to add new features, please follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/my-feature.
Make your changes and commit them: git commit -m 'Add some feature'.
Push to the branch: git push origin feature/my-feature.
Submit a pull request.