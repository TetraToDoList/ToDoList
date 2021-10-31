const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controller
const {
    create,
    read,
    update,
    remove,
    list,
    removeFromHome,
} = require("../controllers/toDoList");

router.post("/home", authCheck, create);
router.get("/home", list);
router.get("/home/:slug", read);
router.put("/home/:slug", authCheck, update);
router.delete("/home/:slug", authCheck, remove);
router.put('/removeFromHome/:toDoListId', authCheck, removeFromHome);


module.exports = router;
