# DevDis Notes

## Intro

- create `.gitignore` file

  - insde add node modules
    - `nodes_modles/`

- initialize git

  - `git init`

- create package.json
  - `npm init`
  - add in name, description, `entry point`, author and `license`
  - entry point
    - `server.js`
  - license
    - `MIT`

## Installations

### Regular

- `npm i `
  - express
    - main web framework for our backend
  - express-validator
    - data validation
    - when we make a post request to our API
      - if there's fields that need to be there that aren't
        - it raises an error
  - bcryptjs
    - password encryption
  - config
    - For global variables
  - gravatar
    - for profile avatars
  - jsonwebtoken
    - JWT to pass along token for validation
  - mongoose
    - layer that sits on top of the database, so we can interact with it
  - request
    - small module that allows us to make HTTP requests to another API

### Dev

- `npm i -D`
  - nodemon
    - constantly watch our server
    - don't have to refresh it
  - concurrently
    - allows us to run backend express server
    - and front end react dev server
    - at the same time

<br>

---

## Section 2: Express And MongoDB Setup

---

### Basic Express Setup

#### `server.js`

- simple server

- ```js
    // import Express Framework
    const express = require('express');
    // instatiate Express App
    const app = express();

    // Simple endpoint
    // app.get(path, callback)
    app.get('/', (req, res) => res.send('API Running'));

    const PORT = process.env.PORT || 5000

    app.listen(PORT, ()=> console.log('Server started on port ${PORT}`));

  ```

#### Change package manager scripts

- change `test` to `start`
- create `server` and add in `nodemon`

  - "server": nodemon [server name]

- ```
    "scripts": {
        "start": "node server",
        "server":"nodemon server"
      },

  ```

#### Test the server on Postman

- http://localhost:8000

## <br>

### Connecting To MongoDB With Mongoose

- create a `Config` folder
  - because we installed config `npm i config`
- create `default.json` file

  - allows you to store default variables
  - be able to access it anywhere

- store MongoDB URI in default json

- create `db.js`

  - here we can create our db connection
  - import mongoose
  - import config
  - get the uri information

  - we can just write

    - ```js
      mongoose.connect(db);
      ```

    - but that returns a promise
    - async is better way to handle it

  - instead create a async function

    - ```js
      const connectDB = async () => {
        // always wrap try-catch on async

        try {
          await mongoose.connect(db);
          console.log("Success!!");
        } catch (err) {
          console.log("Fail");
          console.log(err.message);
        }
      };
      ```

<br>

---

### Routes Files With Express Router

- create routes folder

  - create api folder

    - create `users.js`, `auth.js`,`profile.js` and `posts.js`

    - bring in express
      - `const express = require("express")`
    - bring in router

      - `const router = express.Router()`

    - here we can say `router.get(path, callback)`
      - `router.get('/', (req,res) => res.send("Users Route"))`
      - diff between app.get and router.get
        - think of router.get as a mini-app

- insider `server.js`

  - define our routes here
    - `app.use("/api/users", require("./routes/api/users))`

- Summary:
  - organize routes inside a route folder
    - organize api inside a api folder
  - call each api link from server.js

<br>

---

## Section 3: User API Routes & JWT Authentication

---

### Creating The User Model

- create `models` folder

  - models are uppercase
    - create `User.js`

- User.js model

  - get mongoose
  - instatiate schema

    - ```js

          const UserSchema = new mongoose.Schema({
            name:{
              type:String
              required: true
            },
            ...ect
          })

      ```

  - exporting

  - `js module.exports = User = mongoose.model("user", UserSchema)`

<br>

---

### Request & Body Validation

-
