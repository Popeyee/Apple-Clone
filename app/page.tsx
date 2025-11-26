import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Showcase from "./components/Showcase";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <>
      <div>
        <Hero />
        <ProductViewer />
        <Showcase />
      </div>
    </>
  );
}
