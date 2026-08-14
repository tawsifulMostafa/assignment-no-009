import Image from "next/image";
import { Card, Button } from "@heroui/react";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const AllRoomPage = async () => {
    const res = await fetch("http://localhost:8000/rooms");
    const allRooms = await res.json();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 max-w-7xl mx-auto">
            {allRooms.map((room) => (
                <Card
                    key={room._id}
                    className="overflow-hidden"
                    shadow="sm"
                >
                    {/* Image */}
                    <div className="relative h-52 sm:h-56 md:h-60 w-full">
                        <Image
                            src={room.image}
                            alt={room.roomName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5">
                        <h2 className="text-lg sm:text-xl font-bold">
                            {room.roomName}
                        </h2>

                        <p className="mt-2 text-sm text-default-500 line-clamp-2">
                            {room.description}
                        </p>

                        <div className="flex items-center gap-2 mt-4">
                            <Clock size={17} />
                            <span className="text-sm text-default-500">
                                ${room.hourlyRate} / hour
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
    );
};

export default AllRoomPage;