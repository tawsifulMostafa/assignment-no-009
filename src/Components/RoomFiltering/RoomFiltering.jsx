"use client";

import Image from "next/image";
import { Card, Button, SearchField, Label } from "@heroui/react";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Amenities from "../Amenities/Amenities";

const RoomFiltering = () => {
    const [amenities, setAmenities] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);

            try {
                const params = new URLSearchParams();

                amenities.forEach((amenity) => {
                    params.append("amenities", amenity);
                });
                if (searchName.trim()) {
                    params.append("name", searchName);
                }

                const res = `${process.env.NEXT_PUBLIC_SERVER_SIDE_URL
                    }/rooms?${params.toString()}`;

                const resData = await fetch(res);
                const data = await resData.json();
                setRooms(data);

            } catch (error) {
                console.error(error);
                setRooms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [amenities, searchName]);

    return (
        <div>
            <SearchField name="search">
                <Label>Search</Label>
                <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-70"
                        placeholder="Search..."
                    />
                    <SearchField.ClearButton />
                </SearchField.Group>
            </SearchField>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Filter Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <div className="border rounded-xl p-5 lg:sticky lg:top-6">
                            <h2 className="text-xl font-bold mb-5">
                                Filter Rooms
                            </h2>

                            <Amenities
                                amenities={amenities}
                                setAmenities={setAmenities}
                            />
                        </div>
                    </aside>

                    {/* Rooms Section */}
                    <main className="flex-1">

                        {/* Result Count */}
                        {!loading && (
                            <div className="mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold">
                                    Available Rooms
                                </h2>

                                <p className="text-sm text-default-500 mt-1">
                                    {rooms.length} rooms found
                                </p>
                            </div>
                        )}

                        {/* Loading */}
                        {loading && (
                            <div className="py-20 text-center">
                                <p className="text-default-500">
                                    <span className="loading loading-spinner text-success"></span>
                                </p>
                            </div>
                        )}

                        {/* No Rooms */}
                        {!loading && rooms.length === 0 && (
                            <div className="border rounded-xl py-20 text-center">
                                <h3 className="text-xl font-semibold">
                                    No Rooms Found
                                </h3>

                                <p className="mt-2 text-sm text-default-500">
                                    Try changing or removing some filters.
                                </p>
                            </div>
                        )}

                        {/* Room Grid */}
                        {!loading && rooms.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {rooms.map((room) => (
                                    <Card
                                        key={room._id}
                                        className="overflow-hidden hover:scale-[1.02] transition-transform"
                                        shadow="sm"
                                    >
                                        {/* Image */}
                                        <div className="relative h-52 w-full">
                                            <Image
                                                src={room.image}
                                                alt={room.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <h2 className="text-lg font-bold">
                                                {room.name}
                                            </h2>

                                            <p className="mt-2 text-sm text-default-500 line-clamp-2">
                                                {room.description}
                                            </p>

                                            <div className="flex items-center gap-2 mt-4">
                                                <Clock size={17} />

                                                <span className="text-sm text-default-500">
                                                    ${room.rate} / hour
                                                </span>
                                            </div>

                                            <Link
                                                href={`/rooms/${room._id}`}
                                                className="block"
                                            >
                                                <Button
                                                    color="primary"
                                                    className="mt-5 w-full"
                                                    endContent={<ArrowRight size={17} />}
                                                >
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </section>
        </div>
    );
};

export default RoomFiltering;