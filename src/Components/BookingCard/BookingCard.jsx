"use client";

import { useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BookingCard = ({ room }) => {
    const { data, isPending } = useSession();
    const user = data?.user;
const router = useRouter()
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    if (!room) return null;

    const {
        _id,
        name,
        description,
        image,
        floor,
        capacity,
        rate,
        amenities,
    } = room;

   const handleBooking = async () => {
    if (isPending) {
        toast.warning("Session loading...");
        return;
    }

    if (!user?.id) {
        toast.error("Please login first!");
        return;
    }

    if (!bookingDate || !startTime || !endTime) {
        toast.error("Please select date, start time and end time!");
        return;
    }

    const start = new Date(`${bookingDate}T${startTime}`);
    const end = new Date(`${bookingDate}T${endTime}`);

   
    if (end <= start) {
        toast.error("End time must be after start time!");
        return;
    }

    
    const durationInHours =
        (end - start) / (1000 * 60 * 60);

  
    const totalPrice = durationInHours * rate;

    const allBookingData = {
        userId: user.id,
        userName: user.name,

        roomId: _id,
        name,

        bookingDate,
        startTime,
        endTime,

        duration: durationInHours,
        hourlyRate: rate,
        totalPrice,

        description,
        image,
        floor,
        capacity,
        amenities,
    };

    const { data: tokenData } = await authClient.token();
    const { token } = tokenData;

    toast.promise(
        fetch(`${process.env.NEXT_PUBLIC_SERVER_SIDE_URL}/bookings`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(allBookingData),
        }).then(async (res) => {

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Booking failed!"
                );
            }

            return data;
        }),
        {
            loading: "Booking in progress...",
            success: `${name} booked successfully!`  ,
            error: (error) => error.message,
        }
    );
    
    router.push("/my-bookings")
    
    
};

    return (
        <div>
            <AlertDialog>
                <Button
                    variant="danger"
                    className="rounded-none border-blue-300 border bg-white text-blue-400"
                >
                    Book Room
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">

                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />

                                <AlertDialog.Heading>
                                    Confirm Book{" "}
                                    <strong className="text-xl">
                                        {name}?
                                    </strong>
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                {/* Room Information */}
                                <div className="space-y-1">
                                    <p>
                                        <strong>Floor:</strong> {floor}
                                    </p>

                                    <p>
                                        <strong>Capacity:</strong>{" "}
                                        {capacity} persons
                                    </p>

                                    <p>
                                        <strong>Hourly Rate:</strong> ${rate}
                                    </p>

                                    <p>
                                        <strong>Amenities:</strong>{" "}
                                        {amenities?.join(", ")}
                                    </p>
                                </div>

                                {/* Booking Information */}
                                <div className="mt-5 space-y-4">

                                    {/* Date */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Booking Date
                                        </label>

                                        <input
                                            type="date"
                                            value={bookingDate}
                                            onChange={(e) =>
                                                setBookingDate(e.target.value)
                                            }
                                            className="w-full rounded-md border px-3 py-2"
                                        />
                                    </div>

                                    {/* Start Time */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Start Time
                                        </label>

                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) =>
                                                setStartTime(e.target.value)
                                            }
                                            className="w-full rounded-md border px-3 py-2"
                                        />
                                    </div>

                                    {/* End Time */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            End Time
                                        </label>

                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) =>
                                                setEndTime(e.target.value)
                                            }
                                            className="w-full rounded-md border px-3 py-2"
                                        />
                                    </div>

                                    {/* Preview */}
                                    {startTime &&
                                        endTime &&
                                        endTime > startTime && (
                                            <div className="rounded-md bg-gray-100 p-3">
                                                <p className="text-sm">
                                                    Booking:{" "}
                                                    <strong>
                                                        {startTime} - {endTime}
                                                    </strong>
                                                </p>

                                                <p className="text-sm">
                                                    Duration:{" "}
                                                    <strong>
                                                        {(
                                                            (new Date(
                                                                `1970-01-01T${endTime}`
                                                            ) -
                                                                new Date(
                                                                    `1970-01-01T${startTime}`
                                                                )) /
                                                            (1000 * 60 * 60)
                                                        ).toFixed(2)}{" "}
                                                        hours
                                                    </strong>
                                                </p>

                                                <p className="text-sm">
                                                    Total Price:{" "}
                                                    <strong>
                                                        $
                                                        {(
                                                            ((new Date(
                                                                `1970-01-01T${endTime}`
                                                            ) -
                                                                new Date(
                                                                    `1970-01-01T${startTime}`
                                                                )) /
                                                                (1000 *
                                                                    60 *
                                                                    60)) *
                                                            rate
                                                        ).toFixed(2)}
                                                    </strong>
                                                </p>
                                            </div>
                                        )}
                                </div>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="tertiary"
                                    className="rounded-none"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={handleBooking}
                                    type="button"
                                    slot="close"
                                    variant="outline"
                                    className="rounded-none bg-green-300"
                                    disabled={
                                        isPending ||
                                        !user?.id ||
                                        !bookingDate ||
                                        !startTime ||
                                        !endTime
                                    }
                                >
                                    {isPending
                                        ? "Loading..."
                                        : "Book Room"}
                                </Button>
                            </AlertDialog.Footer>

                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default BookingCard;