const models = require(__dirname + '/../models');

module.exports.findAllUsers = (req, res) => {
    models.User.findAll().then(users => {
        res.send(users);
    });
};