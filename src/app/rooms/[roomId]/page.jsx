import Image from "next/image";
import { Card, Chip } from "@heroui/react";
import { Users, Clock, MapPin, Zap } from "lucide-react";
import BookingCard from "@/Components/BookingCard/BookingCard";

const RoomDetailsPage = async ({ params }) => {
    const { roomId } = await params;

    const res = await fetch(`http://localhost:8000/rooms/${roomId}`);
    const room = await res.json();

    const {
        roomName,
        description,
        image,
        floor,
        capacity,
        rate,
        amenities,
        bookingCount,
    } = room;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <Card className="overflow-hidden">

                {/* Image */}
                <div className="relative h-100 w-full">
                    <Image
                        src={image}
                        alt={room}
                        fill
                        className="object-cover"
                    />

                    <Chip
                        color="primary"
                        className="absolute top-5 right-5"
                    >
                        ${rate}/hour
                    </Chip>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">

                    <h1 className="text-3xl font-bold">
                        {roomName}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {description}
                    </p>



                    {/* Room Info */}
                    <div className="pb-6 border-b border-gray-200">

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                            <div className="flex items-center gap-3">
                                <MapPin className="text-primary" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Floor
                                    </p>
                                    <p className="font-semibold">
                                        {floor}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Users className="text-primary" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Capacity
                                    </p>
                                    <p className="font-semibold">
                                        {capacity} People
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Clock className="text-primary" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Hourly Rate
                                    </p>
                                    <p className="font-semibold">
                                        ${rate}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Zap className="text-primary" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Bookings
                                    </p>
                                    <p className="font-semibold">
                                        {bookingCount}
                                        {/* todo: bookings count function for counting booking times */}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>



                    {/* Amenities */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">
                            Amenities
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {amenities?.map((amenity, index) => (
                                <Chip
                                    key={index}
                                    color="primary"
                                    variant="flat"
                                >
                                    {amenity}
                                </Chip>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center p-3">
                        <BookingCard room={room} />
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default RoomDetailsPage;