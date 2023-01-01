const {getUserByEmailModel} = require('../models/usersModels')
const bcrypt = require('bcrypt')

async function isNewUser(req, res, next) {
     const user = await getUserByEmailModel(req.body.email);
     if (user) {
        res.status(400).send("User Details Already Exists");
        return;
     }
     next();
}

function hashPwd(req, res, next) {
     const saltRounds = 10;
     bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
               res.status(500).send(err.message);
               return;
          }
          req.body.password = hash;
          next();
     });
}

module.exports = {isNewUser, hashPwd}