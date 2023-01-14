const { getUserByEmailModel } = require("../models/usersModels");
const bcrypt = require("bcrypt");
const { getUserByIdModel } = require("../models/usersModels");

async function isNewUser(req, res, next) {
   const user = await getUserByEmailModel(req.body.email);
   if (user) {
      res.status(400).send("User Details Already Exists");
      return;
   }
   next();
}

async function updatePwd(req, res, next) {
   const oldUser = await getUserByIdModel(req.body.userId);
   req.body.old = oldUser;
   bcrypt.compare(req.body.password, oldUser.password).then((match) => {
      if (!match) {
         res.status(400).send(
            "Wrong Password"
         );
         return
      } else if (req.body.newPassword) {
         const saltRounds = 10;
         bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
            if (err) {
               res.status(500).send(err.message);
               return;
            }
            req.body.password = hash;
    
           next();
         });
      
      } else {
         req.body.password = oldUser.password
           next();
      }
   });
}

async function updateEmail(req, res, next) {

   if (req.body.email !== req.body.old.email) {
      const isEmailExist = await getUserByEmailModel(req.body.email);
      if (isEmailExist) {
         res.status(400).send({
            error: "Email Address Already in Use",
         });
      }
   }
   next()
}

// });

//   const saltRounds = 10;
//    bcrypt.hash(newUser.newPassword, saltRounds, (err, hash) => {
//       if (err) {
//          res.status(500).send(err.message);
//          return;
//       }
//       req.body.password = hash;
//    });
//    next()

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

module.exports = { isNewUser, hashPwd, updatePwd, updateEmail };
