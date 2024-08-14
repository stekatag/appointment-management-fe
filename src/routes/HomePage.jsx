import BarbersSection from "../components/BarbersSection/BarbersSection";
import BookNowCTASection from "../components/BookNowCTASection/BookNowCTASection";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import StatsSection from "../components/StatsSection/StatsSection";
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
    </>
  );
}
