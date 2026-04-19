import Image from "next/image";
import Hero from "./components/Hero";
import Parents from "./components/Parents";
import Gallery from "./components/Gallery";
import Candles from "./components/Candles";
import Balloons from "./components/Balloons";
import Treasures from "./components/Treasures";
import Event from "./components/Event";
import RSVP from "./components/RSVP";
import About from "./components/About";

export default function Home() {
  return (
    <div className="wrapper">
      <Hero />
      <About />
      <Parents />
      <Gallery />
      <Candles />
      <Balloons />
      <Treasures />
      <Event />
      <RSVP />
    </div>
  );
}
