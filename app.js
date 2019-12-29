const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./routes/users');


const app = express();

app.listen(3000, () => {
    console.log('Server is listening at http://localhost:3000')
});
app.use(express.json());
// app.use(express.static(
//     path.join(__dirname, 'public')
// ))
app.use(cookieParser());

usersRoutes(app);