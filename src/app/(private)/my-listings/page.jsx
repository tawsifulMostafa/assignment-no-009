import { auth } from "@/app/lib/auth";
import { sessionCheck } from "@/app/lib/session";
import { Button, Card } from "@heroui/react";
import { Clock, Eye } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const MyListingsPage = async () => {
    const session = await sessionCheck();
    const userId = session?.user?.id;

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/rooms/user/${userId}`,
         {
            cache: "no-store",
            headers:{
                authorization : token
            }
         }
    );


    const rooms = await res.json();


    if (rooms.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-default-300 bg-default-50 p-12 text-center">
                    <h2 className="text-2xl font-bold">
                        No listings found
                    </h2>

                    <p className="mt-2 text-default-500">
                        You haven&apos;t added any rooms yet.
                    </p>
                    <div className="p-3 m-4 grid gap-3">

                        <p>
                            If you want to add room...?
                        </p>
                        <Link href={"/add-rooms"}>
                            <Button>Add-Room</Button></Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    My Listings
                </h1>

                <p className="mt-2 text-default-500">
                    Manage the rooms you have added.
                </p>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

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

                        {/* Content */}
                        <div className="p-5">

                            <h2 className="text-xl font-bold">
                                {room.name}
                            </h2>

                            <p className="mt-2 text-sm text-default-500 line-clamp-2">
                                {room.description}
                            </p>

                            {/* Rate */}
                            <div className="flex items-center gap-2 mt-4">
                                <Clock size={17} />

                                <span className="text-sm text-default-500">
                                    ${room.rate} / hour
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-5">

                                <Link
                                    href={`/rooms/${room._id}`}
                                    className="flex-1"
                                >
                                    <Button
                                        variant="flat"
                                        className="w-full bg-green-200"
                                    >
                                        <Eye size={17} />
                                        View
                                    </Button>
                                </Link>
                            </div>

                        </div>
                    </Card>
                ))}

            </div>
        </div>
    );
};

export default MyListingsPage;