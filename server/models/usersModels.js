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
      const response = await dbConnection.from("users").insert(
         {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            password: newUser.password,
            isAdmin: false,
         },
         ["userId"]
      );
      if (response) return { ok: true };
   } catch (err) {
      console.log(err);
   }
}

const getUserByEmailModel = async (email) => {
   try {
      const user = await dbConnection
         .from("users")
         .where({ email: email })
         .first();
      return user;
   } catch (err) {
      console.log(err);
   }
};

const getUserByIdModel = async (userId) => {
   try {
      const user = await dbConnection
         .from("users")
         .where({ userId: userId })
         .first();
      return user;
   } catch (err) {
      console.log(err);
   }
};

const updateUserModel = async (userInfo) => {

   try {
      const newUser = {
         firstName: userInfo.firstName,
         lastName: userInfo.lastName,
         email: userInfo.email,
         bio: userInfo.bio,
         phone: userInfo.phone,
         password: userInfo.password,
      };

      const res = await dbConnection
         .from("users")
         .where({ userId: userInfo.userId })
         .update(newUser);
      if (res) return true;
   } catch (err) {
      console.log(err);
   }
}

async function deleteUserModel(userId) {
   try {
      const deleted = await dbConnection
         .from("users")
         .where({ userId: userId })
         .del();
      return deleted;
   } catch (err) {
      console.log(err);
   }
}

module.exports = {
   signUpModel,
   readAllUsersModel,
   getUserByEmailModel,
   deleteUserModel,
   getUserByIdModel,
   updateUserModel,
};
