import BookNowCTASection from "../components/BookNowCTASection/BookNowCTASection";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import VideoSection from "../components/VideoSection/VideoSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <BookNowCTASection />
      <VideoSection />
    </>
  );
}
