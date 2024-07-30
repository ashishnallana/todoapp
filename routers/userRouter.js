const { Router } = require("express");
const { register, login } = require("../controllers/userController");
const userMiddleware = require("../middleware/authMiddleware");

const router = Router();

// routes starts with /user. ex => localhost:3001/user/register

router.post("/register", register);
router.post("/login", login);

// auth verification
router.get("/user-auth", userMiddleware, (req, res) => {
  res.status(200).send({
    ok: true,
    success: true,
    message: "You are Authorized",
  });
});

module.exports = router;
