const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { validateToken, validateAdminToken } = require("../middleware/JWT");
const {
   isNewUser,
   hashPwd,
   updatePwd,
   updateEmail,
} = require("../middleware/usersMiddleware");
const { validateBody } = require("../middleware/validateBody");
const { userSchema, loginSchema } = require("../schemas/userSchemas");

router.post(
     "/signup",
     validateBody(userSchema),
     isNewUser,
     hashPwd,
     UsersController.signUp);

router.post(
     "/login",
     validateBody(loginSchema),
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
   updatePwd,
   updateEmail,
   UsersController.updateUser
);

router.delete(
   "/:userId/delete",
   validateToken,
   validateAdminToken,
   UsersController.deleteUser
);

module.exports = router;
