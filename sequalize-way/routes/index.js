const express = require("express");
const router = express.Router();

router.post("/users", (req, res) => {
  res.send("This is post");
});
router.get("/users", (req, res) => {
  res.send("This is get all");
});
router.get("/users/:id", (req, res) => {
  res.send("This is get by id");
});
router.delete("/users/:id", (req, res) => {
  res.send("This is delete");
});
router.put("/users/:userId", (req, res) => {
  res.send("This is put");
});

module.exports = router;
