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

async function updatePwdAndEmail(req, res, next) {
   const newUser = req.body;
   console.log(newUser);
   const oldUser = await getUserByIdModel(newUser.userId);
   bcrypt.compare(newUser.password, oldUser.password).then((match) => {
      if (!match) {
         res.status(400).send({
            error: "Wrong Password",
         });
      } else if (newUser.newPassword) {
          
         //    bcrypt.hash(newUser.newPassword, saltRounds, (err, hash) => {
         //       if (err) {
         //          res.status(500).send(err.message);
         //          return;
         //       }
         //       req.body.password = hash;
         //    });
     
      }
   });
   //    if (newUser.email !== oldUser.email) {
   //      const isEmailExist = await getUserByEmailModel(newUser.email);
   //      if (isEmailExist) {
   //         res.status(400).send({
   //            error: "Email Address Already in Use",
   //         });
   //      }
   //    }
     const saltRounds = 10;
      bcrypt.hash(newUser.newPassword, saltRounds, (err, hash) => {
         if (err) {
            res.status(500).send(err.message);
            return;
         }
         req.body.password = hash;
      });
      next()
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

module.exports = { isNewUser, hashPwd, updatePwdAndEmail };
