const dbConnection = require("../knex/knex");

async function readAllUsersModel() {
   try {
      const usersList = await dbConnection.from("users");
      return usersList;
   } catch (err) {
      console.log(err);
   }
}

async function signUpModel(newUser) {
   try {
      const response = await dbConnection
         .from("users")
         .insert(newUser, ["userId"]);
      const userId = response[0];
      return userId;
   } catch (err) {
      console.log(err);
   }
}

//KNEX:
const getUserByEmailModel = async (email) => {
   try {
      const user = await dbConnection.from("users").where({ email: email }).first();
      return user;
   } catch (err) {
      console.log(err);
   }
};

async function deleteUserModel(userId){
     try{
          const deleted = await dbConnection.from("users").where({userId:userId}).del();
          return deleted;
     }catch(err){
          console.log(err);
     }
} 

module.exports = {
   signUpModel,
   readAllUsersModel,
   getUserByEmailModel,
   deleteUserModel,
};
