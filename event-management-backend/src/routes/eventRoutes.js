const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  toggleAttendance,
  getEventAttendanceStatus,
  deleteEvent,
} = require("../controllers/eventController");
const auth = require("../middleware/auth");

router.post("/", auth, createEvent);
router.get("/", getEvents);
router.post("/:eventId/attendance", auth, toggleAttendance);
router.get("/:eventId/attendance", auth, getEventAttendanceStatus);
router.delete("/:eventId", auth, deleteEvent);

module.exports = router;
