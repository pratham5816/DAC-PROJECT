import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/FeedbackPage.css";

const FeedbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const maxChars = 200;

  useEffect(() => {
    // First preference: navigation state
    if (location.state?.customerId) {
      setCustomerId(location.state.customerId);
      setCustomerName(location.state.customerName || "");
      setRating(location.state.rating || 0);
      return;
    }

    // Fallback: localStorage
    const storedCustomerId = localStorage.getItem("customerId");
    const storedEmail = localStorage.getItem("customerEmail");

    if (!storedCustomerId) {
      navigate("/customer");
      return;
    }

    setCustomerId(storedCustomerId);
    setCustomerName(storedEmail || "");
  }, [location, navigate]);

  //submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rating) {
      setError("Please provide a rating");
      return;
    }

    try {
      await axios.post(
        "https://localhost:7073/api/feedback",
        {
          customerId,
          rating,
          feedback,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Thank you for your valuable feedback!");
      navigate("/customer");
    } catch (err) {
      console.error(err);
      setError("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="feedback-page-wrapper">
      <div className="feedback-card">
        <h1 className="feedback-title">What can we improve?</h1>

        {customerName && (
          <p className="feedback-subtitle">
            We value your experience, {customerName}
          </p>
        )}

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <textarea
            className="feedback-textarea"
            placeholder="Share your thoughts with us..."
            value={feedback}
            maxLength={maxChars}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />

          <div className="char-count">
            {feedback.length}/{maxChars} characters
          </div>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>

        <p className="thankyou-text">
          Thank you for taking the time to help us improve our service.
        </p>
      </div>
    </div>
  );
};

export default FeedbackPage;
