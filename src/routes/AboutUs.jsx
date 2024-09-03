import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent/BreadcrumbsComponent";
import VideoSection from "../sections/VideoSection/VideoSection";
import BookNowCTASection from "../sections/BookNowCTASection/BookNowCTASection";
import AboutUsSection from "../sections/AboutUsSection/AboutUsSection";

export default function AboutUs() {
  return (
    <>
      <Header />
      <BreadcrumbsComponent />
      <AboutUsSection />
      <VideoSection />
      <BookNowCTASection />
      <Footer />
    </>
  );
}
