const dbConnection = require("../knex/knex");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const {
   signUpModel,
   deleteUserModel,
   getUserByEmailModel,
   getUserByIdModel,
   updateUserModel,
} = require("../models/usersModels");
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/JWT");
const { getPetsByUserModel } = require("../models/petsModels");

const signUp = async (req, res) => {
   const newUser = req.body;
   try {
      const userId = await signUpModel(newUser);
      res.send({ userId: userId, ok: true });
   } catch (err) {
      res.status(500).send(err);
   }
};

const login = async (req, res) => {
   const { email, password } = req.body;
   const user = await getUserByEmailModel(email);
   if (!user) {
      res.status(400).send({ error: "User Doesn't Exist" });
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
            res.send({
               userId: user.userId,
               firstName: user.firstName,
               lastName: user.lastName,
               email: user.email,
               bio: user.bio,
               phone: user.phone,
            });
         }
      });
   }
};

const getAllUsers = async (req, res) => {
   try {
      const users = await dbConnection.from("users");

      res.send(users);
   } catch (err) {
      console.log(err);
   }
};

const getUserById = async (req, res) => {
   const { userId } = req.params;
   try {
      const user = await getUserByIdModel(userId);
      res.send(user);
   } catch (err) {
      console.log(err);
   }
};

const getFullUserById = async (req, res) => {
   const { userId } = req.params;
   try {
      const user = await getUserByIdModel(userId);
      const userPets = await getPetsByUserModel(userId);
      res.send({user, userPets});
   } catch (err) {
      console.log(err);
   }
};

const updateUser = async (req, res) => {
   const userInfo  = req.body;
   try {
      const response = await updateUserModel(userInfo);
      res.send(response);
   } catch (err) {
      console.log(err);
   }
};

const deleteUser = async (req, res) => {
   const { userId } = req.params;
   try {
      const deleted = await deleteUserModel(userId);
      if (deleted) res.send(`User ${userId} Was Deleted`);
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   signUp,
   getAllUsers,
   deleteUser,
   login,
   getUserById,
   updateUser,
   getFullUserById,
};
