import Bio from "../../components/MainPage/bio/Bio";
import Hero from "../hero/Hero";
import BioParallax from "../../components/MainPage/bioParallax/BioParallax";
import Welcome from "../../components/MainPage/welcome/Welcome";
import GalleryParallax from "../../components/MainPage/galleryParallax/GalleryParallax";
import Visualizations from "../../components/MainPage/visualizations/Visualizations";
import Contact from "../contact/Contact";
import styles from "./uiContainer.module.scss";
import Spinner from "../../components/common/spinner/Spinner";

export default function UiContainer() {
  return (
    <div className={styles.uiContainer}>
      <Hero />
      <Welcome />
      <BioParallax />
      <Bio />
      <GalleryParallax />
      <Visualizations />
      <Contact />
      <Spinner />
    </div>
  );
}
