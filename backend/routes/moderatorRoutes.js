const express = require("express");
const router = express.Router();
const { authMiddleware, adminOnly } = require("../middleware/auth");
const { getModerators, createModerator } = require("../controllers/moderatorController");

router.use(authMiddleware); // Protect all moderator routes
router.use(adminOnly); // Only admins can access
router.get("/", getModerators);
router.post("/", createModerator);

module.exports = router;