# react-task-app
Used https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

Requires npm, node and a local mysql server running

The database connection details in app.js needs configuring with an account with root privaleges to create the database

Unable to get Docker to work with the MySQL local server

## To work:
1. Clone repository
2. Configure the MySQL login details in app.js on line 15-17
3. When inside root of folder run: npm install
4. cd into client folder: cd client
5. When inside client folder run: npm install
6. cd into root folder and run: npm start
7. This should start the node.js express server and the React website server
8. App should be on http://localhost:3000
