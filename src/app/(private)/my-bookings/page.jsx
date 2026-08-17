import { sessionCheck } from "@/app/lib/session";
import Image from "next/image";
import { CalendarDays, Clock3, DollarSign } from "lucide-react";

const MyBookingsPage = async () => {
    const session = await sessionCheck();
    const userId = session?.user?.id;

    const res = await fetch(`http://localhost:8000/booking/${userId}`, {
        cache: "no-store",
    });

    const bookings = await res.json();

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

            <div className="space-y-5">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                    >
                        {/* Top section */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                            {/* Room info */}
                            <div className="flex items-center gap-4">
                                <Image
                                    alt="room image"
                                    src={booking.image}
                                    width={90}
                                    height={70}
                                    className="w-[90px] h-[70px] object-cover rounded-xl"
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

                            {/* Price */}
                            <div className="text-right">
                                <p className="text-sm text-gray-500">
                                    Total Price
                                </p>

                                <p className="text-xl font-bold text-primary">
                                    ${booking.totalPrice}
                                </p>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookingsPage;