const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { validateToken, validateAdminToken } = require("../middleware/JWT");
const { isNewUser, hashPwd } = require("../middleware/usersMiddleware");
const { validateBody } = require("../middleware/validateBody");
const { userSchema } = require("../schemas/userSchemas");

router.post(
     "/signup",
     validateBody(userSchema),
     isNewUser,
     hashPwd,
     UsersController.signUp);

router.post(
     "/login",
      UsersController.login);

router.get('/logout',
     UsersController.logout)

router.get(
   "/all",
   validateToken,
   validateAdminToken,
   UsersController.getAllUsers
);

router.get(
     "/:userId",
     validateToken,
     UsersController.getUserById);

router.get(
     "/:userId/full",
      validateToken,
       UsersController.getFullUserById);

router.put(
     "/update",
      validateToken,
       UsersController.updateUser);

router.delete(
   "/:userId/delete",
   validateToken,
   validateAdminToken,
   UsersController.deleteUser
);

module.exports = router;
