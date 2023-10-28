# Database Generator Web Application

This is a web application built with Next.js and TypeScript that allows you to create and model a database. It provides a simple interface to define database models, properties, types, relationships, and generate Sequelize models automatically.

## Features

- Create database models.
- Add properties to each model.
- Choose from a list of Sequelize data types.
- Configure properties as unique, nullable, and with default values.
- Set parameters like size for string properties.
- Define relationships between models (1-to-1, N-to-1, N-to-N).
- Create optional indexes, including unique indexes.
- Store all information in an API.

## Getting Started

Follow these steps to run the application on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (with npm or yarn)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository using Git:

   ```bash
   git clone https://github.com/Dvrklex/db_generator
   ```

2. Navigate to the project directory:

   ```bash
   cd db_generator
   ```

3. Install the project dependencies:

   If you use npm:

   ```bash
   npm install
   ```

   If you use yarn:

   ```bash
   yarn
   ```

### Initialize the Server

To run the server, use the following command:

```bash
node server.js
```

### Start the Application

To start the Next.js application, use the following command:

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at `http://localhost:3000`.

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. Start creating your database models and defining properties.
3. Configure data types, uniqueness, nullability, default values, and other options.
4. Define relationships and indexes as needed.
5. Use the "Generate" button to automatically generate Sequelize model files.

## Contributing

If you would like to contribute to this project, please open an issue or create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Next.js and TypeScript communities for their excellent tools and documentation.

Happy modeling!
```

This README provides an introduction to your project, instructions for setting it up, and some guidance on how to use it. You can modify it to suit your specific project and include additional sections or details as needed.