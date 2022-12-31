const path = require('path')
const pathToUsersDB = path.resolve(__dirname, "../../DB/users.json");
const fs = require('fs')
const dbConnection = require("../knex/knex");

function readAllUsersModel() {
     try {
          const usersList = fs.readFileSync(pathToUsersDB);
          return JSON.parse(usersList);
     } catch (err) {
          console.log(err);
     }

     //KNEX:
     //        try {
     //     const usersList = await dbConnection.from('users')
     //     return usersList
     //   } catch (err) {
     //     console.log(err);
     //   }
}

function addUser(newUser) {
     try {
          const allUsers = readAllUsersModel();
          allUsers.push(newUser);
          fs.writeFileSync(pathToUsersDB, JSON.stringify(allUsers));
          return allUsers;
     } catch (err) {
          console.log(err);
     }

     //KNEX:
//        try {
//     const [id] = await dbConnection.from('users').insert(newUser)
//     return id;
//   } catch (err) {
//     console.log(err);
//   }
}

async function addToWishList(userId, petId){
     try {
          const allUsers = readAllUsersModel();

          allUsers.forEach((user) => {
               if (user.userId == userId && !user.wishList.includes(petId)) {
                    user.wishList.push(petId);
               }
          });
          fs.writeFileSync(pathToUsersDB, JSON.stringify(allUsers));
     }catch(err){
          console.log(err);
     }
}


//KNEX:
const getUserByEmailModel = async (email) => {
     try {
          const user = await dbConnection.from("users").where({ email: email });
          console.log(user);
          return user;
     } catch (err) {
          console.log(err);
     }
};



module.exports = { addUser, readAllUsersModel, addToWishList, getUserByEmailModel };