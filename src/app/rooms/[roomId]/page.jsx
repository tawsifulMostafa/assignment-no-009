import Image from "next/image";
import { Card, Chip } from "@heroui/react";
import { Users, Clock, MapPin} from "lucide-react";
import BookingCard from "@/Components/BookingCard/BookingCard";
import { sessionCheck } from "@/app/lib/session";
import EditRoom from "@/Components/EditRoom/EditRoom";
import DeleteRoom from "@/Components/DeleteRoom/DeleteRoom";


const RoomDetailsPage = async ({ params }) => {
    const { roomId } = await params;
    const userData   = await sessionCheck()
    const user = userData?.user || null;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/rooms/${roomId}`);
    const room = await res.json();


    if (!res.ok) {
        return <div className="flex justify-center py-20">
            <h1 className="text-2xl font-bold">
                Room not found
            </h1>
        </div>
    }


    const {
        userId,
        roomName,
        description,
        image,
        floor,
        capacity,
        rate,
        amenities,
        userImage
    } = room;
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <Card className="overflow-hidden">

                {/* Image */}
                <div className="relative h-150 w-full">
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
                            <div className="flex items-center gap-4 border p-4 rounded-2xl">
                                By
                                <Image alt="image"
                                    src={userImage}
                                    height={50}
                                    width={50} />
                                <p>{room.userName}</p>
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

                    <div className="flex justify-center p-3 items-center gap-3 rounded-none">
                        <BookingCard room={room} />
                        {
                            (user?.id === userId && <EditRoom room={room}></EditRoom>)
                        }
                        {
                            (user?.id === userId && <DeleteRoom room={room}></DeleteRoom>)
                        }

                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RoomDetailsPage; 