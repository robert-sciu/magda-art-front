import Bio from "../../components/MainPage/bio/Bio";
import Hero from "../../components/MainPage/hero/Hero";
import BioParallax from "../../components/MainPage/bioParallax/BioParallax";
import Welcome from "../../components/MainPage/welcome/Welcome";
import GalleryParallax from "../../components/MainPage/galleryParallax/GalleryParallax";
import Visualizations from "../../components/MainPage/visualizations/Visualizations";
import ContactForm from "../contact/ContactForm";

export default function UiContainer() {
  return (
    <>
      <Hero />
      <Welcome />
      <BioParallax />
      <Bio />
      <GalleryParallax />
      <Visualizations />
      <ContactForm />
    </>
  );
}
