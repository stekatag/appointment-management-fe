import BarbersSection from "../sections/BarbersSection/BarbersSection";
import BookAppointmentSection from "../sections/BookAppointmentSection/BookAppointmentSection";
import BookNowCTASection from "../sections/BookNowCTASection/BookNowCTASection";
import Footer from "../components/Footer/Footer";
import GallerySection from "../sections/GallerySection/GallerySection";
import Header from "../components/Header/Header";
import HeroSection from "../sections/HeroSection/HeroSection";
import ServicesSection from "../sections/ServicesSection/ServicesSection";
import StatsSection from "../sections/StatsSection/StatsSection";
import TestimonialsSection from "../sections/TestimonialsSection/TestimonialsSection";
import VideoSection from "../sections/VideoSection/VideoSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <BookNowCTASection />
      <VideoSection />
      <StatsSection />
      <ServicesSection />
      <BarbersSection />
      <TestimonialsSection />
      <GallerySection />
      <BookAppointmentSection />
      <Footer />
    </>
  );
}
