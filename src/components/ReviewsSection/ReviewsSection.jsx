import { Grid, Typography, Rating, ListItemText, Button } from "@mui/material";
import { useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import {
  ReviewItem,
  Sidebar,
  SidebarItem,
  SidebarHeader,
} from "./ReviewsSection.styles";
import { ReviewsSectionContainer } from "./ReviewsSection.styles";
import { SidebarMain } from "./ReviewsSection.styles";
import { SidebarHeaderRating } from "./ReviewsSection.styles";
import { StyledList } from "./ReviewsSection.styles";
import { ReviewName } from "./ReviewsSection.styles";
import { ReviewTitle } from "./ReviewsSection.styles";
import { ReviewText } from "./ReviewsSection.styles";

const mockReviews = [
  {
    name: "John Doe",
    rating: 5,
    title: "Great Service!",
    text: "Amazing service, will definitely come again!",
    date: "3 days ago",
  },
  {
    name: "Jane Smith",
    rating: 2,
    title: "Too Expensive",
    text: "Great service but a bit expensive.",
    date: "1 week ago",
  },
  // Add more reviews as needed
];

export default function ReviewsSection() {
  const [selectedRating, setSelectedRating] = useState(null);

  // Calculate average rating and total reviews
  const totalReviews = mockReviews.length;
  const averageRating =
    mockReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

  const filteredReviews = selectedRating
    ? mockReviews.filter((review) => review.rating === selectedRating)
    : mockReviews;

  return (
    <ReviewsSectionContainer maxWidth="lg" id="reviews-section">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Sidebar>
            <SidebarHeader>
              <SidebarHeaderRating>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {averageRating.toFixed(1)}
                </Typography>
                <Rating value={averageRating} precision={0.5} readOnly />
              </SidebarHeaderRating>
              <Typography variant="body1" color="textSecondary">
                {totalReviews} ratings
              </Typography>
            </SidebarHeader>
            <SidebarMain>
              <Typography variant="h6" gutterBottom>
                Filter Reviews
              </Typography>
              {[5, 4, 3, 2, 1].map((star) => (
                <SidebarItem
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  selected={selectedRating === star}
                >
                  <Rating
                    value={star}
                    readOnly
                    icon={<Star fontSize="inherit" />}
                    emptyIcon={<StarBorder fontSize="inherit" />}
                  />
                  <Typography variant="body2">{`(${filteredReviews.length})`}</Typography>
                </SidebarItem>
              ))}
              <Button
                variant="outlined"
                onClick={() => setSelectedRating(null)}
                sx={{ mt: 2 }}
              >
                Clear Filters
              </Button>
            </SidebarMain>
          </Sidebar>
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledList>
            {filteredReviews.map((review, index) => (
              <ReviewItem key={index}>
                <ListItemText
                  primary={
                    <>
                      <ReviewName variant="h5">{review.name}</ReviewName>
                      <Rating value={review.rating} readOnly />
                    </>
                  }
                  secondary={
                    <>
                      <ReviewTitle>{review.title}</ReviewTitle>
                      <ReviewText variant="body2" gutterBottom>
                        {review.text}
                      </ReviewText>
                      <Typography variant="caption" color="textSecondary">
                        {review.date}
                      </Typography>
                    </>
                  }
                />
              </ReviewItem>
            ))}
          </StyledList>
        </Grid>
      </Grid>
    </ReviewsSectionContainer>
  );
}
