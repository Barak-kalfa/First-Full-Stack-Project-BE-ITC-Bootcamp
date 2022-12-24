const express = require("express");
const { uuid } = require("uuidv4");
const router = express.Router();
const fs = require('fs')
const path = require('path')
const pathToUsersDB = path.resolve(__dirname, '../DB/users.json')
const {addUser, readAllUsers} = require('../modules/users_modules/usersModules')

router.get("/", (req, res) => {
   const data = JSON.parse(fs.readFileSync(pathToUsersDB))
     res.send(JSON.stringify(data));
});


router.post("/", (req, res) => {
     try {
          const newUser = {
               ...req.body,
               id: uuid(),
          }
          const listWithNewUser = addUser(newUser);
          if (listWithNewUser) {
               res.send(newUser);
          }
     } catch (err) {
          console.log(err);
          res.status(500).send(err);
     }
   
    res.send(req.body)
});

router.post('/updateuser', (req,res)=>{
  
})

module.exports = router;