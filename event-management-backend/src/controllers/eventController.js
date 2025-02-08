const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      creator: req.user.id,
    });

    const savedEvent = await event.save();
    req.app.get("io").emit("newEvent", savedEvent);
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("creator", "username")
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleAttendance = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const isAttending = event.attendees.includes(userId);

    if (isAttending) {
      // Remove attendance
      event.attendees = event.attendees.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // Add attendance
      event.attendees.push(userId);
    }

    const updatedEvent = await event.save();

    req.app.get("io").emit("attendanceUpdate", {
      eventId: event._id,
      attendeesCount: event.attendees.length,
      isAttending: !isAttending,
    });

    res.json({
      isAttending: !isAttending,
      attendeesCount: event.attendees.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventAttendanceStatus = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const isAttending = event.attendees.includes(userId);

    res.json({
      isAttending,
      attendeesCount: event.attendees.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.creator.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(req.params.eventId);

    req.app.get("io").emit("eventDeleted", req.params.eventId);

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
