const db = require("../models");
const Game = db.games;

// Create and Save a new Game
exports.create = (req, res) => {
  // Validate request
  if (!req.body.hometeam) {
    res.status(400).send({ message: "Hometeam can not be empty!" });
    return;
  }

  // Create a Game
  const game = new Game({
    homeTeam: req.body.hometeam,
    awayTeam: req.body.awayteam
  });

  // Save Game in the database
  game
    .save(game)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Game."
      });
    });
};

// Retrieve all Games from the database.
exports.findAll = (req, res) => {
    const homeTeam = req.query.hometeam;
    //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Game.find().sort( { gameDate: -1, league: 1 })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving games."
        });
      });
};

// Find a single Game with an id
exports.findOne = (req, res) => {
  
};

// Update a Game by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Game with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Games from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Games
exports.findAllPublished = (req, res) => {
  
};