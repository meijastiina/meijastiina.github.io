module.exports = app => {
    const games = require("../controllers/game.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Game
    //router.post("/", games.create);
  
    // Retrieve all Games
    router.get("/", games.findAll);

    app.use("/api/games", router);
  };