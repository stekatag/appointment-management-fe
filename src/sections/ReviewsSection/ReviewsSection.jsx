import {
  Grid,
  Typography,
  Rating,
  ListItemText,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import {
  ReviewItem,
  Sidebar,
  SidebarItem,
  SidebarHeader,
  ReviewsSectionContainer,
  SidebarMain,
  SidebarHeaderRating,
  StyledList,
  ReviewName,
  ReviewTitle,
  ReviewText,
} from "./ReviewsSection.styles";
import { useFetchReviewsQuery } from "../../services/api/reviewsApi";
import { useFetchServicesQuery } from "../../services/api/servicesApi";
import { useFetchBarbersQuery } from "../../services/api/barbersApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function ReviewsSection() {
  const [selectedRating, setSelectedRating] = useState(null);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  // Fetch reviews, services, and barbers from the database
  const { data: reviews = [], isLoading, isError } = useFetchReviewsQuery();
  const { data: services = [] } = useFetchServicesQuery();
  const { data: barbers = [] } = useFetchBarbersQuery();

  // Average rating
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

  // Filter reviews based on selected rating
  const filteredReviews = selectedRating
    ? reviews.filter((review) => review.rating === selectedRating)
    : reviews;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Paginate the filtered reviews based on the current page
  const paginatedReviews = filteredReviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  // Reset the page when the rating filter is changed
  useEffect(() => {
    setPage(1);
  }, [selectedRating]);

  // Handle page change
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Filter reviews count by star rating
  const reviewsCountByRating = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rating === star).length,
  }));

  if (isLoading) return <Typography>Loading reviews...</Typography>;
  if (isError) return <Typography>Error loading reviews.</Typography>;

  return (
    <ReviewsSectionContainer maxWidth="lg" id="reviews-section">
      <Grid container spacing={4}>
        {/* Sidebar for Filtering */}
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
              {reviewsCountByRating
                .filter(({ count }) => count > 0) // Only show stars with reviews
                .map(({ star, count }) => (
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
                    <Typography variant="body2">{`(${count})`}</Typography>
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

        {/* Reviews List */}
        <Grid item xs={12} md={8}>
          <StyledList>
            {paginatedReviews.map((review) => {
              const service = services.find((s) => s.id === review.serviceType);
              const barber = barbers.find((b) => b.id === review.barberId);

              return (
                <ReviewItem key={review.id}>
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
                        <Typography variant="body2">
                          Barber:{" "}
                          <strong>
                            {barber
                              ? `${barber.firstName} ${barber.lastName}`
                              : "Loading..."}
                          </strong>
                          , Service:{" "}
                          <strong>
                            {service ? service.title : "Loading..."}
                          </strong>
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {dayjs(review.date).fromNow()}
                        </Typography>
                      </>
                    }
                  />
                </ReviewItem>
              );
            })}
          </StyledList>

          {/* Pagination */}
          {filteredReviews.length > reviewsPerPage && (
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </ReviewsSectionContainer>
  );
}
