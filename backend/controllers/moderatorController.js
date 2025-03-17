// Moderator Controller

// Get all moderators
exports.getModerators = async (req, res) => {
  try {
      // Assuming we have a Moderator model
      const moderators = await Moderator.find();
      res.status(200).json({
          success: true,
          count: moderators.length,
          data: moderators
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error fetching moderators",
          error: error.message
      });
  }
};

// Create a new moderator
exports.createModerator = async (req, res) => {
  try {
      const { username, email, password, role } = req.body;
      
      // Basic validation
      if (!username || !email || !password) {
          return res.status(400).json({
              success: false,
              message: "Please provide all required fields"
          });
      }

      // Check if moderator already exists
      const existingModerator = await Moderator.findOne({ email });
      if (existingModerator) {
          return res.status(400).json({
              success: false,
              message: "Moderator with this email already exists"
          });
      }

      // Create new moderator
      const moderator = await Moderator.create({
          username,
          email,
          password, // In a real app, this should be hashed
          role: role || "moderator"
      });

      res.status(201).json({
          success: true,
          data: moderator,
          message: "Moderator created successfully"
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error creating moderator",
          error: error.message
      });
  }
};

// Get single moderator by ID
exports.getModerator = async (req, res) => {
  try {
      const moderator = await Moderator.findById(req.params.id);
      
      if (!moderator) {
          return res.status(404).json({
              success: false,
              message: "Moderator not found"
          });
      }

      res.status(200).json({
          success: true,
          data: moderator
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error fetching moderator",
          error: error.message
      });
  }
};

// Update moderator
exports.updateModerator = async (req, res) => {
  try {
      const moderator = await Moderator.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
              new: true,
              runValidators: true
          }
      );

      if (!moderator) {
          return res.status(404).json({
              success: false,
              message: "Moderator not found"
          });
      }

      res.status(200).json({
          success: true,
          data: moderator,
          message: "Moderator updated successfully"
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error updating moderator",
          error: error.message
      });
  }
};

// Delete moderator
exports.deleteModerator = async (req, res) => {
  try {
      const moderator = await Moderator.findByIdAndDelete(req.params.id);

      if (!moderator) {
          return res.status(404).json({
              success: false,
              message: "Moderator not found"
          });
      }

      res.status(200).json({
          success: true,
          message: "Moderator deleted successfully"
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error deleting moderator",
          error: error.message
      });
  }
};