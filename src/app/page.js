import Sports from "../components/Sports.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import SimpleUse from "../components/SimpleUse.jsx";

import ReviewSection from "../components/ReviewSec.jsx";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <Sports></Sports>
      <SimpleUse></SimpleUse>
      <ReviewSection></ReviewSection>
      
    </div>
  );
}
