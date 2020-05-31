module.exports = mongoose => {
    const Game = mongoose.model(
      "game",
      mongoose.Schema(
        {
          homeTeam: String,
          awayTeam: String
        }
      )
    );
  
    return Game;
  };