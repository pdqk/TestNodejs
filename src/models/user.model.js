var dbConn = require('../../config/db.config');

var User = function(user){
    this.Username = user.Username;
    this.Password = user.Password;
}

User.getAllUsers = (result) => {
    dbConn.query('SELECT * FROM `test`.`Users`', (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(null, err);
        } else {
            console.log('Fetch all users successfully');
            result(null, res);
        }

    });
}

User.getUserById = (id, result) => {
    dbConn.query('SELECT * FROM `test`.`Users` WHERE id=?', id, (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(null, err);
        } else {
            console.log('Fetch user by id successfully');
            result(null, res);
        }

    });
}

User.getUserByName = (Username, Password, result) => {
    dbConn.query('SELECT * FROM `test`.`Users` WHERE Username = ? AND Password = ?', [Username, Password], (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(null, err);
        } else {
            console.log('Fetch user by name successfully');
            result(null, res);
        }

    });
}

User.createNewUser = (userData, result) => {
    dbConn.query('INSERT INTO `test`.`Users` SET ?', userData, (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(null, err);
        } else {
            console.log('New user was created !');
            result(null, res);
        }
    });
}

User.updateUser = (id, userData, result) => {
    dbConn.query('UPDATE `test`.`Users` SET Username = ?, Password = ? WHERE id = ?', [userData.Username, userData.Password, id], (err, res) => {
        if(err) result(null, err);
        result(null, res);
    });
}

User.deleteUser = (id, result) => {
    dbConn.query('DELETE FROM `test`.`Users` WHERE id = ?', id, (err, res) => {
        if(err) result(null, err);
        result(null, res);
    });
}

module.exports = User;