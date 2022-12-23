const express = require("express");
const { uuid } = require("uuidv4");
const router = express.Router();
const fs = require('fs')
const path = require('path')
const pathToUsersDB = path.resolve(__dirname, '../DB/users.json')

router.get("/", (req, res) => {
   const data = JSON.parse(fs.readFileSync(pathToUsersDB))
     res.send(JSON.stringify(data));
});

module.exports = router;
