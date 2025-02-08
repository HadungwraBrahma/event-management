import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/axiosConfig";
import "./CreateEvent.css";

function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    imageUrl: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploadingImage(true);
      const base64 = await convertToBase64(file);
      const response = await API.post("/api/upload", { data: base64 });
      setEventData({ ...eventData, imageUrl: response.data.url });
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreatingEvent(true);

    try {
      await API.post("/api/events", eventData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setCreatingEvent(false);
    }
  };

  return (
    <div className="create-event-container">
      <form className="create-event-form" onSubmit={handleSubmit}>
        <h2>Create New Event</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="datetime-local"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="networking">Networking</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Event Image:</label>
          <div className="image-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-input"
            />
            {uploadingImage && (
              <div className="uploading-message">Uploading image...</div>
            )}
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={uploadingImage || creatingEvent}
        >
          {creatingEvent ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
