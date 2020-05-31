module.exports = app => {
    const leagues = require("../controllers/league.controller.js");
  
    var router = require("express").Router();
  
    // Create a new League
    //router.post("/", leagues.create);
  
    // Retrieve all Leagues
    router.get("/", leagues.findAll);

    app.use("/api/leagues", router);
  };