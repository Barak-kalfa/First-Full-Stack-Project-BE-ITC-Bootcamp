const express = require("express");
const { uuid } = require("uuidv4");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const pathToUsersDB = path.resolve(__dirname, "../DB/users.json");
const UsersController = require("../controllers/usersController");

const {
     addUser,
     readAllUsers,
     addToWishList,
} = require("../models/usersModels");

router.get("/", (req, res) => {
     const data = JSON.parse(fs.readFileSync(pathToUsersDB));
     res.send(JSON.stringify(data));
});

router.post("/signup", (req, res) => {
     try {
          const newUser = {
               ...req.body,
               id: uuid(),
          };
          const listWithNewUser = addUser(newUser);
          if (listWithNewUser) {
               res.send(newUser);
          }
     } catch (err) {
          console.log(err);
          res.status(500).send(err);
     }

     res.send(req.body);
});

router.post('/login', (req,res)=>{
     res.send(req.body)
})
router.post("/addtowish", (req, res) => {
     const { petId, userId } = req.body;

     addToWishList(userId, petId);
     // try {
     //      const response = addToWishList(userId, petId);
     //      res.send(response);
     // } catch (err) {
     //      console.log(err);
     // }
});

router.put("/update", (req, res) => {
     console.log(req.body);
     res.send(req.body);
});

module.exports = router;
