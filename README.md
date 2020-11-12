# Nodejs Backend Boilerplate

## Project's Structure

```md
├──src
|   ├── config
|   |      ├── db.js
|   |      └── ...
|   ├── controllers
|   |      ├── userController.js
|   |      └── ...
|   ├── middlewares
|   |      ├── authMiddleware.js
|   |      ├── errorMiddleware.js
|   |      └── ...
|   ├── models
|   |      ├── userModel.js
|   |      └── ...
|   ├── routes
|   |      ├── userRoutes.js
|   |      └── ...
|   ├── utils
|   |      ├── seeder
|   |      |     ├── fakeData.js
|   |      |     └── seeder.js
|   |      ├── generateToken.js
|   |      └── ...
|   └── server.js
├ .env
├ .gitignore
├ package.json
└ README.md
```

## Installation & Activation

In order to install and activate the boilerplate, follow the instructions below please:

1. download/clone this repository
2. create `.env` in the root directory.
3. `.env` should contain the following environment variables:

   `NODE_ENV=development`

   `PORT=<any_available_port>`

   `MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/proshop?retryWrites=true&w=majority`

   `JWT_SECRET=<any_JWT_SECRET>`

4. run `npm install` to install all dependencies
5. run `npm run dev` to watch the server

## Available Scripts

```md
"scripts": {
"start": "node src/server", // start the server
"dev": "nodemon src/server", // watches the server
"data-import": "node src/utils/seeder/seeder", // refresh & import fake data
"data-destroy": "node src/utils/seeder/seeder -d" // destroys all DB's data
},
```
