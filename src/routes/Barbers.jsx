import BarbersSection from "../components/BarbersSection/BarbersSection";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent/BreadcrumbsComponent";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function Barbers() {
  return (
    <>
      <Header />
      <BreadcrumbsComponent />
      <BarbersSection />
      <Footer />
    </>
  );
}
