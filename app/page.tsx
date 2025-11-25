import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <>
      <div>
        <Hero />
        <ProductViewer />
      </div>
    </>
  );
}
