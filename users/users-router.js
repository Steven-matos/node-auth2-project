const router = require("express").Router();

const Users = require("./users-model");

router.get("/users", (req, res) => {
  Users.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Failed to retrieve Users",
        error: err
      });
    });
});

module.exports = router;
