import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useFetchReviewByIdQuery } from "../../services/api/reviewsApi";
import ReviewForm from "../../forms/ReviewForm";

const EditReview = () => {
  const { reviewId } = useParams();
  const {
    data: reviewToEdit,
    isLoading,
    isError,
  } = useFetchReviewByIdQuery(reviewId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !reviewToEdit) {
    return <Typography variant="h6">Review not found</Typography>;
  }

  return <ReviewForm reviewToEdit={reviewToEdit} />;
};

export default EditReview;
