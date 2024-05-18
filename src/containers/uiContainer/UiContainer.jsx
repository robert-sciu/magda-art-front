import Bio from "../../components/MainPage/bio/Bio";
import Hero from "../../components/MainPage/hero/Hero";
import BioParalax from "../../components/MainPage/bioParalax/BioParalax";
import Welcome from "../../components/MainPage/welcome/Welcome";

export default function UiContainer() {
  return (
    <>
      <Hero />
      <Welcome />
      <BioParalax />
      <Bio />
    </>
  );
}
