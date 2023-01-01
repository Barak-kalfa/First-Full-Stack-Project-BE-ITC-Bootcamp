const dbConnection = require("../knex/knex");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());


const {
   signUpModel,
   deleteUserModel,
   getUserByEmailModel,
} = require("../models/usersModels");
const bcrypt = require('bcrypt');
const { createToken } = require("../middleware/JWT");


const signUp = async (req, res) => {
   const newUser = req.body;
   console.log(newUser);
   try {
      const userId = await signUpModel(newUser);
      res.send({userId: userId, ok: true});
   } catch (err) {
      res.status(500).send(err);
   }
};

const login = async (req, res)=>{
   const {email, password} = req.body;
   const user = await getUserByEmailModel(email)
   if (!user) {
      res.status(400).send({error: "User Doesn't Exist"})
} else {
   bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
         res.status(400).send({
            error: "Wrong Email Address and Password Combination!",
         });
      } else {
         const accessToken = createToken(user);
         res.cookie("access-token", accessToken, {
            maxAge: 604800000,
            httpOnly: true,
         });
         console.log(req.cookies);
         res.send("Logged In");
      }
   });

}
}

const getAllUsers = async (req, res) => {
   try {
      const users = await dbConnection.from("users");
      res.send(users);
   } catch (err) {
      console.log(err);
   }
};

const deleteUser = async (req, res) => {
     const {userId} = req.params;
   try {
     const deleted = await deleteUserModel(userId);
     if (deleted) res.send(`User ${userId} Was Deleted`);
   } catch (err) {
      console.log(err);
   }
};

module.exports = { signUp, getAllUsers, deleteUser, login };
