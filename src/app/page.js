import FeaturedRooms from "@/Components/FeaturedRooms/FeaturedRooms";
import HomeBanner from "@/Components/HomeBanner/HomeBanner";
import WhyChooseUs from "@/Components/WhyChooseUs/WhyChooseUs";
 

 

export default function Home() {
  return (
    <div>
      <HomeBanner/>
       <FeaturedRooms/>
       <WhyChooseUs/>
    </div>
  )
}