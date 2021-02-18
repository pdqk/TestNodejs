const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./src/routes/user.route');
const passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(passport.initialize());

app.use('/api/v1/user', userRoute);

app.listen(3000, function(){
    console.log('Express is running on port 3000');
});