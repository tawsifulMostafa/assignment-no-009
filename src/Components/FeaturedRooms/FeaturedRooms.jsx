
import { ArrowChevronRight } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeaturedRooms = async () => {
    const res = await fetch("http://localhost:8000/rooms/featured")
    const rooms = await res.json()
 
    return (
        <div>
            <div className="flex justify-between pt-20  p-5 ">
                <p className="text-3xl font-bold">  Featured Rooms
                </p>
                <Button className={"bg-green-200 text-black"}  >
                    Explore More Room  <ArrowChevronRight></ArrowChevronRight>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
                {rooms.map((room) => (

                    <Card
                        key={room._id}
                        className="overflow-hidden"
                        shadow="sm"
                    >
                        {/* Image */}
                        <div className="relative h-52 sm:h-56 md:h-60 w-full">
                            <Image
                                src={room.image}
                                alt={room.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Card Content */}
                        <div className="p-4 sm:p-5">
                            <h2 className="text-lg sm:text-xl font-bold">
                                {room.name}
                            </h2>
                            <p className="mt-2 text-sm text-default-500 line-clamp-2">
                                {room.description}
                            </p>

                            <div className="flex items-center gap-2 mt-4">
                                <Clock size={17} />
                                <span className="text-sm text-default-500">
                                    ${room.rate
                                    } / hour
                                </span>
                            </div>

                            <Link href={`rooms/${room._id}`}>
                                <Button
                                    color="primary"
                                    className="mt-4 w-full"
                                    endContent={<ArrowRight size={17} />}
                                >
                                    View Details
                                </Button></Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FeaturedRooms;