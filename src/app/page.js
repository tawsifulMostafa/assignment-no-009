import FeaturedRooms from "@/Components/FeaturedRooms/FeaturedRooms";
 
import HomeBanner from "@/Components/HomeBanner/HomeBanner";
import HowItWorks from "@/Components/HowItWorks/HowItWorks";
import WhyChooseUs from "@/Components/WhyChooseUs/WhyChooseUs";
export default function Home() {
  return (
    <div>
      <HomeBanner/>
       <FeaturedRooms/>
       <WhyChooseUs/>
       <HowItWorks></HowItWorks>
    </div>
  )
}