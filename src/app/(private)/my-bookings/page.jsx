import { auth } from "@/app/lib/auth";
import { sessionCheck } from "@/app/lib/session";
import BookingItem from "@/Components/BookingItem/BookingItem";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata = {
    title: "My Bookings"
};
const MyBookingsPage = async () => {
    const session = await sessionCheck();
    const userId = session?.user?.id;
    const {token} =await auth.api.getToken({
        headers: await headers()
    })

  
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/booking/${userId}`, {
        cache: "no-store",
         headers: {
            authorization: `${token}`
        }
    });

    const bookings = await res.json();

    if (bookings.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        No bookings found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        You haven&apos;t booked any rooms yet.
                    </p>
                    <Button className={"m-4"}>
                        <Link href={"/rooms"}>Go to Rooms</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">


            {bookings.map((booking) => (
                <BookingItem
                    key={booking._id}
                    booking={booking}
                />
            ))}
        </div>
    );
};

export default MyBookingsPage;