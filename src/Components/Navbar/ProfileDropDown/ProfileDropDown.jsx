"use client"
import { signOut } from "@/app/lib/auth-client";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { ArrowUpRightFromSquare, GalleryHorizontal, PersonStanding } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";


const ProfileDropDown = ({ user }) => {

    const { name, image, email } = user
    return (
        <div>
            <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                    <Avatar>
                        <Avatar.Image
                            alt={name}
                            src={image}
                        />
                        <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                    </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                    <div className="px-3 pt-3 pb-1">
                        <div className="flex items-center gap-2">
                            <Avatar size="sm">
                                <Avatar.Image
                                    alt="Jane"
                                    src={image}

                                />
                                <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col gap-0">
                                <p className="text-sm leading-5 font-medium">{name}</p>
                                <p className="text-xs leading-none text-muted">{email}</p>
                            </div>
                        </div>
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item id="dashboard" textValue="Dashboard">
                            <Link href={"/add-rooms"}>
                                <Label>Add Rooms</Label>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item id="settings" textValue="Settings">
                            <div className="flex w-full items-center justify-between gap-2">
                                <Link href={"/my-listings"}>
                                    <Label>My Listings</Label></Link>
                                <GalleryHorizontal className="size-3.5 text-muted" />
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item id="new-project" textValue="New project">
                            <div className="flex w-full items-center justify-between gap-2">
                                <Label>Create Team</Label>
                                <PersonStanding className="size-3.5 text-muted" />
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                            id="logout"
                            textValue="Logout"
                            variant="danger"
                            onClick={async () => {
                                await signOut();
                                toast
                                window.location.reload();
                            }}
                        >
                            <div className="flex w-full items-center justify-between gap-2">
                                <Label>Logout</Label>
                                <ArrowUpRightFromSquare className="size-3.5 text-danger" />
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </div>
    );
};

export default ProfileDropDown;