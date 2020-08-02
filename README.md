# Libera Superheroes

```
The project is specifically built for the second round of Libera interview
```

## Project Link

```
The Project currently runs on the local environment of the user. The frontend is configured to run on port: 3000 and the backend runs on port: 9000
```

## The Building Blocks of the Application

1. Frontend
2. Backend

### Frontend

The frontend of the Application is built using React and React Hooks.

### Backend

The frontend of the Application is built using Node.js.

### Project Structure

```
.
├── README.md
├── backend
│   ├── app.js
│   ├── bin
│   │   └── www
│   ├── configs
│   │   ├── superheroConfig.js
│   │   ├── superheroes.js
│   │   └── teams.js
│   ├── model
│   │   ├── superhero.js
│   │   ├── superheroTeam.js
│   │   └── team.js
│   ├── package-lock.json
│   ├── package.json
│   └── routes
│       ├── index.js
│       └── routes.js
└── frontend
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── index.html
    │   └── manifest.json
    └── src
        ├── common-hooks
        │   └── useHandleClickOutside.js
        ├── components
        │   ├── button
        │   │   ├── button.css
        │   │   └── button.jsx
        │   ├── card
        │   │   ├── card.css
        │   │   └── card.jsx
        │   ├── dashboard
        │   │   ├── dashboard.css
        │   │   └── dashboard.jsx
        │   ├── footer
        │   │   ├── footer.css
        │   │   └── footer.jsx
        │   ├── modal
        │   │   ├── modal.css
        │   │   └── modal.jsx
        │   ├── navbar
        │   │   ├── navbar.css
        │   │   └── navbar.jsx
        │   └── textbox
        │       ├── textbox.css
        │       └── textbox.jsx
        ├── configs
        │   └── apiEndPoints.js
        ├── index.css
        ├── index.js
        ├── pages
        │   └── home.jsx
        ├── serviceWorker.js
        └── setupTests.js
```

## Installation

1. Clone the repository
2. Steps to run the frontend of the Application. Go to root directory of the frontend Application and run the commands:

```
- npm install
- npm start
```

3. Steps to run the backend of the Application. Go to root directory of the backend Application and run the command:

```
- npm install
- npm start
```

Note: The frontend is configured to run on port: 3000 and the backend runs on port: 9000

## Features

- uses REST conventions and routes to:  
   - add a superhero - add a team - add a superhero to the team (superheros may be members of more than one team)

  - remove a team
  - remove a superhero
  - remove a superhero from a team
  - retrieve a superhero by Id (including the teams they are part of)
  - retrieve a team by Id (including the superheros on the team)
  - based on the content of a group, report the mean alignment of the group
  - the backend of the application handles most of the errors and the front end displays the same

- uses React to Display the Functionalities elegantly
  - reusable react components such as Button, Textbox, Modal, Card, etc
  - most of the components are accessible and are developed based on the open source contents available online
  - the application allows the user to perform all the above mentioned functionalities
  - the user interface is responsive but was developed as a desktop first application
  - test cases for the react components

## Test Case Scenarios

- The APIs Returns an expected value
- Ths APIs Throws an exception under the tested condition
- The APIs Changes the state of the system in-memory data

Note: Currently the unit test cases of the APIs are not present but can be added.
