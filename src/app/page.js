import Sports from "../components/Sports.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import SimpleUse from "../components/SimpleUse.jsx";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <Sports></Sports>
      <SimpleUse></SimpleUse>
      
    </div>
  );
}
