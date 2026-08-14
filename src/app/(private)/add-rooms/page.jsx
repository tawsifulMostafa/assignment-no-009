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
    const router = useRouter()
    const [amenities, setAmenities] = useState([]);

    const { data } = useSession()

    const user = data?.user
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const addData = Object.fromEntries(formData.entries());
        addData.rate = Number(addData.rate);
        addData.capacity = Number(addData.capacity);
        addData.amenities = amenities;
        addData.userName = user.name
        addData.userId = user.id
        addData.userImage = user.image

        const res = await fetch("http://localhost:8000/add-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addData),
        });
        toast.success("room added Successfully",
            {
                style: {
                    color: "green"
                }
            }
        )
        router.push("/my-listings")
    };




    return (
        <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
            <Surface className="w-full min-w-[380px]">
                <Form onSubmit={onSubmit}>
                    <Fieldset className="w-full">
                        <Fieldset.Legend>Add Room Information</Fieldset.Legend>

                        <Fieldset.Group>
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
                                <Input placeholder="Room Name?" variant="secondary" />
                                <FieldError />
                            </TextField>

                            <TextField isRequired name="image">
                                <Label>Image</Label>
                                <Input
                                    placeholder="Room image url"
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
                                <Input placeholder="e.g. 4" variant="secondary" />
                                <Description>Number of people this room can hold</Description>
                                <FieldError />
                            </NumberField>

                            <TextField isRequired name="floor">
                                <Label>Floor</Label>
                                <Input
                                    placeholder="Floor?"
                                    variant="secondary"
                                />
                                <FieldError />
                            </TextField>

                            <NumberField isRequired name="rate" minValue={1}>
                                <Label>Hourly Rate</Label>
                                <Input placeholder="Rate / hour" variant="secondary" />
                                <Description>Per hour rate in $</Description>
                                <FieldError />
                            </NumberField>

                            <TextField name="description">
                                <Label>Description</Label>
                                <TextArea
                                    placeholder="Tell us about room..."
                                    variant="secondary"
                                />
                                <Description>
                                    Minimum 10 characters
                                </Description>
                                <FieldError />
                            </TextField>

                            {/* Amenities */}
                            <Amenities
                                amenities={amenities}
                                setAmenities={setAmenities}
                            />

                        </Fieldset.Group>

                        <Fieldset.Actions>
                            <Button type="submit">
                                <FloppyDisk />
                                Add Room
                            </Button>

                            <Button type="reset" variant="tertiary">
                                Cancel
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </Surface>
        </div>
    );
}
export default AddRoomsPage





// Form fields:
// Room Name (text, required)
// Description (textarea, required)
// Image (image URLfrom internet)
// Floor (text/number, e.g., “3rd Floor”)
// Capacity (number, e.g., 4)
// Hourly Rate (number, e.g., 5 – in dollars)
// Amenities – a set of checkboxes. Options: Whiteboard, Projector, Wi‑Fi, Power Outlets, Quiet Zone, Air Conditioning. Selected values are joined into an array of strings.
// On success: toast “Room added successfully” and redirect to My Listings or Rooms page.
