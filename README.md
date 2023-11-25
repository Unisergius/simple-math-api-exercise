# simple-math-api-exercise

Node.js + Express + TypeScript math api

Here's a skeleton for us to clone in the 6th fCC meetup in Ikea

## Development

This project requires Node.JS installed, a javascript runtime that runs code
inside a v8 engine without a browser. See more on how to install it at
[nodejs.org](https://nodejs.org/en).

Clone it and start from there.

```sh
git clone https://github.com/Unisergius/simple-math-api-exercise.git
# or over ssh
git clone git@github.com:Unisergius/simple-math-api-exercise.git
```

To install this project's dependencies, you have to run the following command
from a terminal inside the project's directory. 

```sh
# change into the git's directory if needed
cd simple-math-api-exercise
# install dependencies
npm install
```

This installs the node dependencies into the node_modules directory, what some
may know them as vendors folder.

The dependencies for this project are bellow with a few links on how they work
and their documentaion:

* [Express 4 API](https://expressjs.com/en/4x/api.html)
* [TypeScript](https://www.typescriptlang.org/)
* [Jest 29.5 Docs](https://jestjs.io/docs/29.5/getting-started)

Node.js executes JavaScript code, but as you can see this project uses
TypeScript as its scripting language. What this means is that our code is type
checked using TypeScript but needs to be compiled for Node.js to be able to
read our code.

To compile the code to JavaScript you can run the build command using npm. This
is actually running the TypeScript compiler using `tsc`, the reason to not
directly run the `tsc` command is that you may not have TypeScript installed
globally in your system. This is actually good since it forces your machine to
run the TypeScript compiler for the verison defined in the dependencies.

```sh
npm run build
```

Our server is written is Express, a Node.js library that facilitates the
handling of http requests to a server in JavaScript. Our handlers are all
inside of the [index.ts](./index.ts) file. Go take a look.

To start the Express application, run the following command:


```sh
npm start
# or if you need to rebuild and run again
npm run build && npm start
```

To change the `port` the web server runs on, you can create a copy of the
`.env.example` file and rename it to `.env`, then write the port into the
variable.

```dotenv
PORT=8080
```

Antoher way to set the port without the need to create a `.env` file is to
set the enviroment variable like bellow

```sh
export PORT=8080
npm start
# or just
PORT=8080 npm start
```

## Testing

Now that we have the basics of how to run the application, we need to test make
the application bullet-proof. This project includes Jest as a dependency and
has some simple tests inside the [__test__](./__test__) directory to make sure
our math library works like intended.

To just run the tests, run the following command:

```sh
npm run test
```

Jest includes a tool to check if you've covered all of your possible use cases
within your code. This type of checking is called Code Coverage, where your
code is analysed by a software that checks every possible coditional path
inside of your code, then checks which paths your tests actually run through
and when it finishes it outputs a percentage value of how much of your code is
actually covered by test cases. To read more about code coverage, you can read
the [wikipedia article](https://en.wikipedia.org/wiki/Code_coverage).

To run the coverage check, run the following command:

```sh
npm run test:coverage
```

## From Scratch

This project is based on a logrocket article:
[Setup node express typescript server](https://blog.logrocket.com/how-to-set-up-node-typescript-express/),
to start from scratch:

```sh
# Initialize a npm project
npm init -y
# Install deployment dependencies
npm install express dotenv
# Install development dependencies
npm i -D typescript @types/express @types/node
```
