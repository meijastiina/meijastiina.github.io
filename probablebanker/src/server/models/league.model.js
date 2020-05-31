module.exports = mongoose => {
    const League = mongoose.model(
      "league",
      mongoose.Schema(
        {
          name: String
        }
      )
    );
  
    return League;
  };