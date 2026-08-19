"use client";

import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
    TextArea,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const EditRoom = ({ room }) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updatedData = {
            name: formData.get("name"),
            floor: formData.get("floor"),
            capacity: Number(formData.get("capacity")),
            rate: Number(formData.get("rate")),
            image: formData.get("image"),
            amenities: formData
                .get("amenities")
                .split(",")
                .map((item) => item.trim()),
            description: formData.get("description"),
        };

        console.log(updatedData);

        const res = await fetch(
            `${process.env.SERVER_SIDE_URL}/rooms/${room._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            }
        );
        if (!res.ok) {
            toast.error("Room Update Unsuccessful", {
                style: {
                    color: "red"
                }
            })
            return
        } else {
            toast.success("Room Details Updated Successfully", {
                style: {
                    color: "green"
                }
            })
        }

        setIsOpen(false)
        router.refresh()

    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>

            {/* Open Modal Button */}
            <div>
                <Button
                    variant="secondary"
                    className="rounded-none bg-white border border-blue-300"
                >
                    Edit Room
                </Button>
            </div>

            <Modal.Backdrop>

                <Modal.Container placement="auto">

                    <Modal.Dialog className="sm:max-w-2xl">

                        <Modal.CloseTrigger />

                        <Modal.Header>
                        </Modal.Header>

                        <Modal.Body>

                            <Surface variant="default">

                                <div className="mx-auto">

                                    <h2 className="font-bold mx-auto flex justify-center  text-3xl pb-6">
                                        Edit Room
                                    </h2>

                                    <form onSubmit={onSubmit}>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            {/* Room Name */}
                                            <div className="md:col-span-2">

                                                <TextField
                                                    name="name"
                                                    isRequired
                                                    defaultValue={room.name}
                                                >
                                                    <Label>
                                                        Room Name
                                                    </Label>

                                                    <Input
                                                        placeholder="Enter room name"
                                                        className="rounded-2xl"
                                                    />
                                                </TextField>

                                            </div>


                                            {/* Floor */}
                                            <TextField
                                                name="floor"
                                                isRequired
                                                defaultValue={room.floor}
                                            >
                                                <Label>
                                                    Floor
                                                </Label>

                                                <Input
                                                    placeholder="2"
                                                    className="rounded-2xl"
                                                />
                                            </TextField>


                                            {/* Capacity */}
                                            <TextField
                                                name="capacity"
                                                type="number"
                                                isRequired
                                                defaultValue={room.capacity}
                                            >
                                                <Label>
                                                    Capacity
                                                </Label>

                                                <Input
                                                    type="number"
                                                    placeholder="34"
                                                    className="rounded-2xl"
                                                />
                                            </TextField>


                                            {/* Hourly Rate */}
                                            <TextField
                                                name="rate"
                                                type="number"
                                                isRequired
                                                defaultValue={room.rate}
                                            >
                                                <Label>
                                                    Hourly Rate
                                                </Label>

                                                <Input
                                                    type="number"
                                                    placeholder="30"
                                                    className="rounded-2xl"
                                                />
                                            </TextField>


                                            {/* Image */}
                                            <div className="md:col-span-2">

                                                <TextField
                                                    name="image"
                                                    type="url"
                                                    isRequired
                                                    defaultValue={room.image}
                                                >
                                                    <Label>
                                                        Image URL
                                                    </Label>

                                                    <Input
                                                        type="url"
                                                        placeholder="https://example.com/image.jpg"
                                                        className="rounded-2xl"
                                                    />
                                                </TextField>

                                            </div>


                                            {/* Amenities */}
                                            <div className="md:col-span-2">

                                                <TextField
                                                    name="amenities"
                                                    isRequired
                                                    defaultValue={room.amenities?.join(", ")}
                                                >
                                                    <Label>
                                                        Amenities
                                                    </Label>

                                                    <Input
                                                        placeholder="Wi-Fi, Whiteboard, Projector"
                                                        className="rounded-2xl"
                                                    />
                                                </TextField>

                                            </div>


                                            {/* Description */}
                                            <div className="md:col-span-2">

                                                <TextField
                                                    name="description"
                                                    isRequired
                                                    defaultValue={room.description}
                                                >
                                                    <Label>
                                                        Description
                                                    </Label>

                                                    <TextArea
                                                        placeholder="Describe the room..."
                                                        className="rounded-3xl"
                                                    />
                                                </TextField>

                                            </div>

                                        </div>


                                        {/* Footer */}
                                        <Modal.Footer className="flex justify-end">

                                            <Button
                                                type="submit"
                                                onPress={() => {
                                                    setIsOpen(true)
                                                }}
                                            >
                                                Update Room
                                            </Button>

                                        </Modal.Footer>

                                    </form>

                                </div>

                            </Surface>

                        </Modal.Body>

                    </Modal.Dialog>

                </Modal.Container>

            </Modal.Backdrop>

        </Modal>
    );
};

export default EditRoom;