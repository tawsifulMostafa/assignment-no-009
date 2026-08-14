"use client";
import { useSession } from "@/app/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "sonner";

const BookingCard = ({ room }) => {
    const { data, isPending } = useSession();
    const user = data?.user;

    if (!room) return null;

    const {
        roomName,
        description,
        imageUrl,
        floor,
        capacity,
        hourlyRate,
        amenities,
        bookingCount,
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

    const allBookingData = {
        userid: user?.id,
        userName: user?.name,
        roomName,
        description,
        imageUrl,
        floor,
        capacity,
        hourlyRate,
        amenities,
        bookingCount,
    };

    toast.promise(
        fetch(`http://localhost:8000/rooms/${user?.id}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(allBookingData),
        }).then((res) => {
            if (!res.ok) throw new Error("Booking failed!");
            return res.json();
        }),
        {
            loading: "Booking in progress...", 
            success: `${roomName} booked successfully!`, 
            error: "Booking failed! Try again.",     
        }
    );
};

    return (
        <div>
            <AlertDialog>
                <Button
                    variant="danger"
                    className={"rounded-none bg-white text-blue-400"}
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
                                    Confirm Book <strong className="text-xl">{roomName}?</strong>
                                </AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>Floor: {floor}</p>
                                <p>Capacity: {capacity} persons</p>
                                <p>Hourly Rate: ${hourlyRate}</p>
                                <p>Amenities: {amenities?.join(", ")}</p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="tertiary"
                                    className={"rounded-none"}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleBooking}
                                    type="submit"
                                    slot="close"
                                    variant="outline"
                                    className={"bg-green-300 rounded-none"}
                                    disabled={isPending || !user?.id}
                                >
                                    {isPending ? "Loading..." : "Book Room"}
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