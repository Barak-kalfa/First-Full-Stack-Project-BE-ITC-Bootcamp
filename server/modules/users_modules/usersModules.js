const path = require('path')
const pathToUsersDB = path.resolve(__dirname, "../../DB/users.json");
const fs = require('fs')

function readAllUsers() {
     try {
          const usersList = fs.readFileSync(pathToUsersDB);
          return JSON.parse(usersList);
     } catch (err) {
          console.log(err);
     }
}

function addUser(newUser) {
     try {
          const allUsers = readAllUsers();
          allUsers.push(newUser);
          fs.writeFileSync(pathToUsersDB, JSON.stringify(allUsers));
          return true;
     } catch (err) {
          console.log(err);
     }
}

module.exports = {addUser, readAllUsers}