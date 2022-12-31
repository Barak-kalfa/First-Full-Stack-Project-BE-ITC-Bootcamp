const {getUserByEmailModel} = require('../models/usersModels')

async function isNewUser(req, res, next) {
     const user = await getUserByEmailModel(req.body.email);
     if (user) {
          res.status(400).send("User already exists");
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