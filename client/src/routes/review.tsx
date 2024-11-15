import React, { useState, useEffect } from "react";
import { Box, Typography, Rating, TextField, Button, Container } from "@mui/material";

const ReviewPage = () => {
  const [reviews, setReviews] = useState<any[]>([]); // Array to hold reviews
  const [driverName, setDriverName] = useState("John Doe"); // Example driver's name
  const [rating, setRating] = useState<number | null>(0); // Rating state
  const [description, setDescription] = useState(""); // Description state

  // Simulating a "saved" DB by storing a JSON string in localStorage
  useEffect(() => {
    // Normally, you'd fetch this from a file, but here we simulate loading from localStorage
    const savedReviews = localStorage.getItem("reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // If no reviews are found, set some predefined ones
      const defaultReviews = [
        {
          driverName: "John Doe",
          rating: 4,
          description: "Great service, very punctual.",
        },
        {
          driverName: "Jane Smith",
          rating: 5,
          description: "Excellent driver, very friendly and safe.",
        },
        {
          driverName: "Mark Johnson",
          rating: 3,
          description: "The ride was okay, but could have been faster.",
        },
      ];
      setReviews(defaultReviews);
      localStorage.setItem("reviews", JSON.stringify(defaultReviews)); // Save this to localStorage
    }
  }, []);

  // Save reviews to localStorage
  const saveReviewsToLocalStorage = (newReviews: any[]) => {
    localStorage.setItem("reviews", JSON.stringify(newReviews));
  };

  const handleAddReview = () => {
    if (rating && description.trim()) {
      const newReview = {
        driverName,
        rating,
        description,
      };

      // Add the new review to the array
      const updatedReviews = [...reviews, newReview];

      // Update state and localStorage
      setReviews(updatedReviews);
      saveReviewsToLocalStorage(updatedReviews);

      // Clear the input fields
      setRating(0);
      setDescription("");
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4">Review {driverName}</Typography>

        {/* Rating */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Rate this Driver</Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
          />
        </Box>

        {/* Description */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Description</Typography>
          <TextField
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Box>

        {/* Add Review Button */}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAddReview}>
            Submit Review
          </Button>
        </Box>

        {/* Displaying Reviews */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Reviews</Typography>
          {reviews.map((review, index) => (
            <Box key={index} sx={{ mb: 2, padding: 2, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography variant="body1"><strong>{review.driverName}</strong></Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2">{review.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ReviewPage;
