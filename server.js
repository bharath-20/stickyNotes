const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const notesController = require("./controllers/notesController");
const feedController = require("./controllers/feedController");
const inviteRoute = require("./routes/invitation");
require('dotenv').config();
const PORT = process.env.PORT || 3000
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', authController);
app.use('/notes', notesController);
app.use('/user', userController);
app.use('/feed' , feedController);
app.use('/', inviteRoute);

app.listen(PORT, () => console.log("Server is running on port ",PORT));
