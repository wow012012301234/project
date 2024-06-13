# VulnScanner Elite - Core Part

## Introduction 
- The VulnScanner Elite is a powerful vulnerability scanning tool designed to help organizations identify and mitigate security vulnerabilities within their systems and applications. This README provides essential information about the Core Part of VulnScanner , including its download, installation, config, and development instructions, usage guidelines.

## Download 

```shell
git clone git@github.com:init-geeks/vulnscan-elite-core.git
```


## Installation
```shell
npm install --save https://github.com.init-geeks/vulnscan-elite-core.git
```

## Development

### Available Scripts

- In the project directory, you can run the following npm scripts:

### `npm run dev`

- Starts the development server using [nodemon](https://www.npmjs.com/package/nodemon) to automatically restart when changes are detected in the TypeScript source files.

### `npm start`

- Cleans the `build` directory, transpiles TypeScript files using [TypeScript (tsc)](https://www.npmjs.com/package/typescript), and starts the application using `node`. This script is typically used to start the production server.

### `npm run clean`

- Deletes the `build` directory to clean up any previously built files.

### `npm run build`

= Cleans the `build` directory and transpiles TypeScript files using `tsc` to generate JavaScript files in the `build` directory. This script is useful for preparing your code for production deployment.

### `npm test`

- Cleans the `build` directory, transpiles TypeScript files using `tsc`, and runs the [Jasmine](https://jasmine.github.io/) test suite. Use this script to run your project's tests.

### `npm run format`

Formats the TypeScript and JavaScript source files in the `src` directory using [Prettier](https://prettier.io/). This script helps maintain consistent code style.

### `npm run lint`

Runs [ESLint](https://eslint.org/) to check for linting issues in your TypeScript files (`*.ts`).

## Usage

To use these scripts, open a terminal in your project directory and run them using `npm run <script-name>`. 

For example:

```shell
npm run dev
# This will start the development server with nodemon.
```

## Notes

- Make sure you have the required dependencies listed in your package.json file, or install them using :
```shell
npm install 
```
