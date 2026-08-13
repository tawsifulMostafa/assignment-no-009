


import { useSession } from "@/app/lib/auth-client";
import { Button, Skeleton } from "@heroui/react";

import Link from "next/link";
import NavLink from "./NavLink";
import ProfileDropDown from "./ProfileDropDown/ProfileDropDown";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const Navbar = async() => {
    // const { data, isPending } = useSession()
    // if (isPending) {
    //     return (
    //         <div className="grid grid-cols-3 gap-8">
    //             <Skeleton className="h-24 w-5/12 ml-4 rounded-xl" />
    //             <Skeleton className="h-24 rounded-xl" />
    //             <Skeleton className="h-24 rounded-xl" />
    //         </div>
    //     )



    // }
    // const user = data?.user

    const session =await auth.api.getSession({
        headers : await headers()
    })
    const user = session?.user
    

    return (
        <div className="flex justify-between p-5 items-center bg-gray-200">

            {/* logo/name */}
            <Link href={'/'}>

                <div className="text-3xl font-bold p-3">
                    StudyNook
                </div></Link>
            {/* mid/navbar */}
            <div>
                {
                    (!user ? <div className="flex gap-3 ">
                        <NavLink href={"/"}>Home</NavLink>
                        <NavLink href={"/rooms"}>Rooms</NavLink>

                    </div> :
                        <div className="flex gap-3 ">
                            <NavLink href={"/"}>Home</NavLink>
                            <NavLink href={"/rooms"}>Rooms</NavLink>
                            <NavLink href={"/add-rooms"}>Add Rooms</NavLink>
                            <NavLink href={"/my-listings"}>My Listings</NavLink>
                            <NavLink href={"/my-bookings"}>My Bookings</NavLink>

                        </div>)
                }
            </div>

            {/* auth */}
            <div>
                {
                    (!user ? <div className="flex gap-4 items-center">

                        <Link href={"/login"}>
                            <Button variant="outline" className={"rounded-none bg-green-100 text-green-500"}>Login</Button>
                        </Link>
                        <Link href={"/signup"}>
                            <Button variant="outline" className={"rounded-none bg-green-100 text-green-500"}>SignUp</Button>
                        </Link>

                    </div> :
                        <ProfileDropDown user={user}></ProfileDropDown>
                    )}

            </div>
        </div>
    );
};

export default Navbar;




























// Public Layout (Not logged in)
// Navbar:
// Logo / website name 
// Navigation links: Home, Rooms (All Rooms)
// Login button
// Register button
// Footer:
// Useful links (Home, Rooms, About)
// Contact information (email, phone)
// Social icons (Facebook, X (new logo), LinkedIn, Instagram)
// Copyright text
// Private Layout (Logged in)
// Navbar:
// Same logo and Home, Rooms
// Additional links: Add Room, My Listings, My Bookings (show when user login)
// Profile dropdown (photo thumbnail + name, or you can put My Listings, My Bookings also ) with Logout
// Footer: Same as public
// Private Routes (Add Room, My Listings, My Bookings, Room Details “Book Now” action)
