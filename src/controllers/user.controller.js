const User = require('../models/user.model');
const UserModel = require('../models/user.model');

exports.getAllUsers = (req, res) => {
    UserModel.getAllUsers((err, listUser) => {
        if(err) res.send(err);
        res.send(listUser);
    });
}

exports.getUserById = (req, res) => {
    UserModel.getUserById(req.params.id, (err, user) => {
        if(err) res.send(err);
        res.send(user);
    });
}

//============== JWT =====================
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
var jwt = require('jsonwebtoken');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'testjwt';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  var user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

exports.getUserByName = (req, res) => {
    let username = req.body.Username;
    let password = req.body.Password;
    if(username && password) {
        UserModel.getUserByName(req.body.Username, req.body.Password, (err, user) => {
            if(err) {
                res.send(err);
            } else {
                // if(req.body.Password === user.Password) {
                    
                // } else {
                //     res.status(401).json({ msg: 'Password is incorrect' });
                // }
                var payload = { id: user.id };
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ msg: 'ok', token: token});
            }
        });
    } else {
        console.log('Field username and password!')
        res.json({ msg: 'Invalid username and password or its empty'});
    }

}
//====================================================================

exports.createUser = (req, res) => {
    const userReqData = new User(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({success: false, message: 'Please fill all fields!'});
    } else {
        UserModel.createNewUser(userReqData, (err, user)=> {
            if(err) res.send(err);
            res.json({status: true, message: 'New user was created!', data: user});
        });
    }
}

exports.updateUser = (req, res) => {
    const userReqData = new User(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({success: false, message: 'Please fill all fields!'});
    } else {
        UserModel.updateUser(req.params.id, userReqData, (err, user)=> {
            if(err) res.send(err);
            res.json({status: true, message: 'User was updated!', data: user});
        });
    }
}

exports.deleteUser = (req, res) => {
    UserModel.deleteUser(req.params.id, (err, user) => {
        if(err) res.send(err);
        res.json({success: true, message: 'Delete user successfully'});
    });
}

