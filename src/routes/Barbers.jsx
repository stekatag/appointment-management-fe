import BarbersSection from "../sections/BarbersSection/BarbersSection";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent/BreadcrumbsComponent";
import TestimonialsSection from "../sections/TestimonialsSection/TestimonialsSection";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ReviewsSection from "../sections/ReviewsSection/ReviewsSection";

export default function Barbers() {
  return (
    <>
      <Header />
      <BreadcrumbsComponent />
      <BarbersSection />
      <TestimonialsSection />
      <ReviewsSection />
      <Footer />
    </>
  );
}
