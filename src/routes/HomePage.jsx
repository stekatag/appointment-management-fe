import BarbersSection from "../components/BarbersSection/BarbersSection";
import BookNowCTASection from "../components/BookNowCTASection/BookNowCTASection";
import GallerySection from "../components/GallerySection/GallerySection";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import StatsSection from "../components/StatsSection/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection/TestimonialsSection";
import VideoSection from "../components/VideoSection/VideoSection";

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
    </>
  );
}
