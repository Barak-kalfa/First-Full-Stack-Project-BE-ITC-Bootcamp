const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { validateToken } = require("../middleware/JWT");
const { isNewUser, hashPwd } = require("../middleware/usersMiddleware");



router.post("/signup", isNewUser, hashPwd, UsersController.signUp);

router.post('/login', UsersController.login)

router.get("/all", validateToken, UsersController.getAllUsers);

router.get("/:userId", UsersController.getUserById);

router.get('/:userId/full', UsersController.getFullUserById)

router.put('/update', UsersController.updateUser)

router.delete("/:userId/delete", UsersController.deleteUser);

module.exports = router;
