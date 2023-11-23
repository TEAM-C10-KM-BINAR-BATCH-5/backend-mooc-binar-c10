const router = require("express").Router();

const user = require("../controllers/userController");

const checkId = require("../middlewares/checkId");

const { User } = require("../models");

router.get("/", user.findUsers);
router.get("/:id", checkId(User), user.findUserById);
router.patch("/:id", checkId(User), user.updateUser);
router.delete("/:id", checkId(User), user.deleteUser);

module.exports = router;
