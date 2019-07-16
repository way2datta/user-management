const models = require(__dirname + '/../models');

module.exports.findAllUsers = (req, res) => {
    models.User.findAll().then(users => {
        res.send(users);
    });
};

module.exports.createNewUser = (req, res) => {
    if (req.body.email === undefined) {
        const errors = {
            errors: { message: "Email is required.", field: "Email" }
        };
        res.status(400);
        return res.send(errors);
    }
    models.User.create(req.body).then(user => {
        res.status(201);
        res.send(user);
    });
};


module.exports.updateById = (req, res) => {
    models.User.update(
        { firstName: req.body.firstName },
        { where: { id: req.params.id } }
    ).then(() => {
        res.sendStatus(204);
    });
}


module.exports.deleteById = (req, res) => {
    models.User.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.sendStatus(204);
    });
}

module.exports.getUserById = (req, res) => {
    models.User.findOne({ where: { id: req.params.id } }).then(user => {
        res.status(200).send(user);
    });
}