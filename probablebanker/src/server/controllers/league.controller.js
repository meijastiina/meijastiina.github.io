const db = require("../models");
const League = db.leagues;

// Create and Save a new League
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  // Create a League
  const league = new League({
    name: req.body.name
  });

  // Save League in the database
  league
    .save(league)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the League."
      });
    });
};

// Retrieve all Games from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    League.find().sort( { orderId: 1 })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving leagues."
        });
      });
};

// Find a single League with an id
exports.findOne = (req, res) => {
  
};

// Update a League by the id in the request
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