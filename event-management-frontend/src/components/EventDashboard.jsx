import { useState, useEffect } from "react";
import API from "../config/axiosConfig";
import io from "socket.io-client";
import "./EventDashboard.css";

function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const socket = io("https://event-management-qx7x.onrender.com");

    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(decoded.id);
      } catch (error) {
        console.error("Error getting current user:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await API.get("/api/events");
        setEvents(response.data);

        response.data.forEach((event) => {
          fetchAttendanceStatus(event._id);
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    const fetchAttendanceStatus = async (eventId) => {
      try {
        const response = await API.get(`/api/events/${eventId}/attendance`);
        setAttendanceStatus((prev) => ({
          ...prev,
          [eventId]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching attendance status:", error);
      }
    };

    fetchEvents();
    fetchCurrentUser();

    socket.on("attendanceUpdate", (data) => {
      setAttendanceStatus((prev) => ({
        ...prev,
        [data.eventId]: {
          isAttending: data.isAttending,
          attendeesCount: data.attendeesCount,
        },
      }));
    });

    socket.on("newEvent", (event) => {
      setEvents((prevEvents) => [...prevEvents, event]);
      fetchAttendanceStatus(event._id);
    });

    socket.on("eventDeleted", (eventId) => {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
    });

    return () => socket.disconnect();
  }, []);

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await API.delete(`/api/events/${eventToDelete._id}`);

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventToDelete._id)
      );
      setShowConfirmModal(false);
      setEventToDelete(null);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert(error.response?.data?.message || "Error deleting event");
    }
  };

  const ConfirmationModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Delete</h3>
        <p>
          Are you sure you want to delete &quot;{eventToDelete?.title}&quot;?
        </p>
        <div className="modal-buttons">
          <button
            className="modal-button cancel"
            onClick={() => {
              setShowConfirmModal(false);
              setEventToDelete(null);
            }}
          >
            Cancel
          </button>
          <button className="modal-button delete" onClick={handleConfirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const handleAttendance = async (eventId) => {
    try {
      const response = await API.post(`/api/events/${eventId}/attendance`, {});

      setAttendanceStatus((prev) => ({
        ...prev,
        [eventId]: response.data,
      }));
    } catch (error) {
      console.error("Error toggling attendance:", error);
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "upcoming") {
      return new Date(event.date) > new Date();
    } else if (filter === "past") {
      return new Date(event.date) < new Date();
    }
    return true;
  });

  return (
    <div className="dashboard-container">
      <div className="filter-section">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming Events</option>
          <option value="past">Past Events</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading events...</div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <div className="event-details">
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
                <p>Category: {event.category}</p>
                <p>
                  Attendees: {attendanceStatus[event._id]?.attendeesCount || 0}
                </p>
                {new Date(event.date) > new Date() && (
                  <button
                    onClick={() => handleAttendance(event._id)}
                    className={`attendance-button ${
                      attendanceStatus[event._id]?.isAttending
                        ? "attending"
                        : ""
                    }`}
                  >
                    {attendanceStatus[event._id]?.isAttending
                      ? "Not Attending"
                      : "Attending"}
                  </button>
                )}
                {currentUserId && event.creator._id === currentUserId && (
                  <button
                    onClick={() => handleDeleteClick(event)}
                    className="delete-button"
                  >
                    Delete Event
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showConfirmModal && <ConfirmationModal />}
    </div>
  );
}

export default EventDashboard;
