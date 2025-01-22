# Overview

The Quiz Project is a web-based application that presents users with multiple-choice questions related
to capital cities around the world. Users can select answers, submit their responses,
and receive immediate feedback on their performance.

## Features

- Multiple-choice questions on capital cities around the world topics.
- Each question offers Three possible answers.
- Immediate feedback on whether the selected answer is correct or incorrect.
- Final score display upon quiz completion.
- Responsive design.

## Live Demo

Try it here: [capital cities Quiz](https://frontend-quiz-project-one.vercel.app/)

## Test Users

You can use the following test users to log in and use the project:

- User 1
 ``` bash
    email: user1@user.com
    password: 12345678
```
- User 2
 ``` bash
    email: user2@user.com
    password: 12345678
```

## Tech Stack

### BackEnd

- Laravel Framework
- PHP
- PostgreSQL
- Click here: [BackEnd GitHub Repo Link](https://github.com/engbeekin/backend-quizProject/)

### FrontEnd

- React
- HTML
- Tailwind CSS

### Deployment

- Deployed the BackEnd API on Heroku
- Deployed the FrontEnd on Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/engbeekin/frontend-quizProject.git

2. Install dependencies:
   ```bash
   npm install

3. Start the application:
   ```bash
   npm start

### Note

- If you using the Local API, please don't forget to update the base url in
```bash
- services/api.js

const api = axios.create({
  baseURL: "https://quiz-app-api-094828e66084.herokuapp.com/api", // change to your local host URL here 
});
```


