# Launch instructions

How to install dependencies and run the app

## Install dependencies

This project uses **MongoDB** and **Node.js**. **Python** and **C++** are also required for compiling `bcrypt`, a package required by the backend.

Run `yarn install` in both the frontend and backend directories:

```bash
$ cd frontend
$ yarn install
$ cd ../backend
$ yarn install
```

## Run frontend and backend separately (ie: in separate terminals)

Frontend:
```bash
$ cd frontend
$ yarn start
```

Backend:  
Make sure you have MongoDB running. For Linux systems, the following command will start the MongoDB systemd service:
```bash
$ sudo systemctl start mongodb.service
```

Then run the following commands
```bash
$ cd backend
$ yarn start
```

## Deploying to production

Build frontend for prod, then run backend with the environment variable DEPLOY=prod and an optional PORT variable.
```bash
$ cd frontend
$ yarn build
$ cd ../backend
$ DEPLOY=prod PORT=5000 node index.js
```
