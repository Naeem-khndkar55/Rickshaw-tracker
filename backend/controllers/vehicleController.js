// Placeholder for vehicle controller (design only)
exports.getVehicles = (req, res) => {
    res.status(200).json({ message: "Get all vehicles" });
  };
  
  exports.createVehicle = (req, res) => {
    res.status(201).json({ message: "Create vehicle" });
  };