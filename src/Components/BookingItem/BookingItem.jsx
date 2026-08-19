"use client"; 
import Image from "next/image";
import { CalendarDays, Clock3 } from "lucide-react";
import { Button, Chip } from "@heroui/react";
import { useState } from "react";

const BookingItem = ({ booking }) => {
    const [status, setStatus] = useState(booking.status);

    const handleCancel = async () => {
        const res = await fetch(
            `${process.env.SERVER_SIDE_URL}/bookings/${booking._id}`,
            {
                method: "PATCH",
            }
        );

        if (res.ok) {
            setStatus("cancelled");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

            {/* Top section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                {/* Room info */}
                <div className="flex items-center gap-4">
                    <Image
                        alt="room image"
                        src={booking.image}
                        width={90}
                        height={70}
                        className="w-22.5 h-17.5 object-cover rounded-xl"
                    />

                    <div>
                        <h2 className="text-lg font-semibold">
                            {booking.name}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Study Room Booking
                        </p>
                    </div>
                </div>

                {/* Price + Status */}
                <div className="text-right">
                    <p className="text-sm text-gray-500">
                        Total Price
                    </p>

                    <p className="text-xl font-bold text-primary">
                        ${booking.totalPrice}
                    </p>

                    <Chip
                        size="sm"
                        color={status === "confirmed" ? "success" : "danger"}
                        variant="flat"
                        className="mt-2"
                    >
                        {status}
                    </Chip>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-5"></div>

            {/* Booking details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <CalendarDays
                        size={20}
                        className="text-primary"
                    />

                    <div>
                        <p className="text-xs text-gray-500">
                            Booking Date
                        </p>

                        <p className="font-medium">
                            {booking.bookingDate}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <Clock3
                        size={20}
                        className="text-primary"
                    />

                    <div>
                        <p className="text-xs text-gray-500">
                            Booking Time
                        </p>

                        <p className="font-medium">
                            {booking.startTime} - {booking.endTime}
                        </p>
                    </div>
                </div>

            </div>

            {/* Cancel Button */}
            {status === "confirmed" && (
                <div className="flex justify-end mt-5">
                    <Button
                        className={"text-red-600 border border-red-200 bg-white rounded-none"}
                        variant="flat"
                        onPress={handleCancel}
                    >
                        Cancel Booking
                    </Button>
                </div>
            )}

        </div>
    );
};

export default BookingItem;