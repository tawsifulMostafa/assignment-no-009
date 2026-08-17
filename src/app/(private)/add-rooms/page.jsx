"use client";

import Amenities from "@/Components/Amenities/Amenities";
import { FloppyDisk } from "@gravity-ui/icons";
import React, { useState } from "react";
import {
    Button,
    Description,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    NumberField,
    Surface,
    TextArea,
    TextField,
} from "@heroui/react";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddRoomsPage = () => {
    const router = useRouter();
    const [amenities, setAmenities] = useState([]);

    const { data } = useSession();
    const user = data?.user;

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const addData = Object.fromEntries(formData.entries());

        addData.rate = Number(addData.rate);
        addData.capacity = Number(addData.capacity);
        addData.amenities = amenities;

        addData.userName = user.name;
        addData.userId = user.id;
        addData.userImage = user.image;

        const res = await fetch("http://localhost:8000/add-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addData),
        });

        if (!res.ok) {
            toast.error("Failed to add room");
            return;
        }

        toast.success("Room added successfully", {
            style: {
                color: "green",
            },
        });

        router.push("/my-listings");
    };

    return (
        <div className="min-h-screen bg-default-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Add a New Room
                    </h1>

                    <p className="mt-2 text-sm text-default-500 sm:text-base">
                        Add your study room and make it available for students.
                    </p>
                </div>

                {/* Form Card */}
                <Surface className="rounded-3xl border border-default-200 bg-white p-5 shadow-sm sm:p-8">
                    <Form onSubmit={onSubmit}>
                        <Fieldset className="w-full">

                            <Fieldset.Legend className="mb-6 text-xl font-semibold">
                                Room Information
                            </Fieldset.Legend>

                            <Fieldset.Group className="gap-6">

                                {/* Room Name + Image */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                    <TextField
                                        isRequired
                                        name="name"
                                        validate={(value) => {
                                            if (value.length < 3) {
                                                return "Name must be at least 3 characters";
                                            }

                                            return null;
                                        }}
                                    >
                                        <Label>Room Name</Label>

                                        <Input
                                            placeholder="e.g. Silent Focus Room"
                                            variant="secondary"
                                        />

                                        <FieldError />
                                    </TextField>

                                    <TextField
                                        isRequired
                                        name="image"
                                    >
                                        <Label>Room Image URL</Label>

                                        <Input
                                            placeholder="https://example.com/room.jpg"
                                            variant="secondary"
                                        />

                                        <Description>
                                            Use an image URL from the internet.
                                        </Description>

                                        <FieldError />
                                    </TextField>

                                </div>

                                {/* Floor + Capacity + Rate */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                                    <TextField
                                        isRequired
                                        name="floor"
                                    >
                                        <Label>Floor</Label>

                                        <Input
                                            placeholder="e.g. 3rd Floor"
                                            variant="secondary"
                                        />

                                        <FieldError />
                                    </TextField>

                                    <NumberField
                                        isRequired
                                        name="capacity"
                                        minValue={1}
                                        maxValue={500}
                                    >
                                        <Label>Capacity</Label>

                                        <Input
                                            placeholder="e.g. 4"
                                            variant="secondary"
                                        />

                                        <Description>
                                            Number of people
                                        </Description>

                                        <FieldError />
                                    </NumberField>

                                    <NumberField
                                        isRequired
                                        name="rate"
                                        minValue={1}
                                    >
                                        <Label>Hourly Rate</Label>

                                        <Input
                                            placeholder="e.g. 5"
                                            variant="secondary"
                                        />

                                        <Description>
                                            Price per hour ($)
                                        </Description>

                                        <FieldError />
                                    </NumberField>

                                </div>

                                {/* Description */}
                                <TextField
                                    isRequired
                                    name="description"
                                    validate={(value) => {
                                        if (value.length < 10) {
                                            return "Description must be at least 10 characters";
                                        }

                                        return null;
                                    }}
                                >
                                    <Label>Description</Label>

                                    <TextArea
                                        placeholder="Tell us about the room..."
                                        variant="secondary"
                                        className="min-h-32"
                                    />

                                    <Description>
                                        Minimum 10 characters
                                    </Description>

                                    <FieldError />
                                </TextField>

                                {/* Amenities */}
                                <div className="rounded-2xl border border-default-200 bg-default-50 p-5">
                                    <div className="mb-4">
                                        <h2 className="text-base font-semibold">
                                            Room Amenities
                                        </h2>

                                        <p className="mt-1 text-sm text-default-500">
                                            Select all amenities available in this room.
                                        </p>
                                    </div>

                                    <Amenities
                                        amenities={amenities}
                                        setAmenities={setAmenities}
                                    />
                                </div>

                            </Fieldset.Group>

                            {/* Actions */}
                            <Fieldset.Actions className="mt-8 flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                <Button
                                    type="reset"
                                    variant="tertiary"
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="w-full sm:w-auto"
                                >
                                    <FloppyDisk />
                                    Add Room
                                </Button>

                            </Fieldset.Actions>

                        </Fieldset>
                    </Form>
                </Surface>
            </div>
        </div>
    );
};

export default AddRoomsPage;