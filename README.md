# MERN todolist
Todoapp is a simple todolist web application made using reactjs, nodejs, expressjs and mongodb which supports realtime data storage and authentication for users. Using todoapp people can add, edit and delete their daily tasks.

## Demo

Live Demo : [https://todoapp-gold-mu.vercel.app](https://todoapp-gold-mu.vercel.app)

![screenshot 01](https://firebasestorage.googleapis.com/v0/b/test-576b6.appspot.com/o/a.png?alt=media&token=da5b2a63-fd51-45a0-b526-42111d1a48e2)

![screenshot 02](https://firebasestorage.googleapis.com/v0/b/test-576b6.appspot.com/o/b.png?alt=media&token=d87030ce-f01e-4324-a68e-1a2d8f817f2b)

## Run Locally
Make sure you have nodejs installed on your desktop.

Clone the project

```bash
  git clone https://github.com/ashishnallana/todoapp.git
```

Go to the project directory

```bash
  cd todoapp
```

Install dependencies 

```bash
  npm install
  cd client
  npm install
```

Setup enviroment variables

```bash
  # ./.env (server)
  DB_URI = "mongo_db_connection_string"
  CLIENT_ORIGIN = "your deployed client domain"
  JWT_SECRET = "your jwt secret code for auth"
```

```bash
  # ./client/.env (client)
  VITE_API = "your backend domain"
```

Run the app locally on your machine

```bash
  node index.js
  cd ./client
  npm run dev
```

