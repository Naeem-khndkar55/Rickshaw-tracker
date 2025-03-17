const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const { uploadImage } = require("../middleware/upload");
const { getVehicles, createVehicle } = require("../controllers/vehicleController");

router.use(authMiddleware); // Protect all vehicle routes
router.get("/", getVehicles);
router.post("/", uploadImage, createVehicle);

module.exports = router;