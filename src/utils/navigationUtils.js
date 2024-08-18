import { scroller } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";

// Utility function for handling navigation and scrolling
export const useHandleSectionLink = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (sectionId, targetPath = "/") => {
    if (location.pathname === targetPath) {
      // If already on the target page, scroll to the section
      scroller.scrollTo(sectionId, {
        duration: 250,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    } else {
      // If on a different page, navigate to the target page and then scroll
      navigate(targetPath, { state: { sectionId } });
    }
  };
};
