"use client"

 
import { signOut, useSession } from "@/app/lib/auth-client";
import { Button } from "@heroui/react";
 
import Link from "next/link";

const Navbar = () => {
    // const {session , user }= await auth.api.getSession({
    //     headers: await headers()
    // })
    const {data , isPending } = useSession()
    if(isPending){
        <div>loading.........</div>
    }
    const user = data?.user
    return (
        <div className="flex justify-between p-5 items-center">




            {/* logo/name */}
            <Link href={'/'}>
            
            <div className="text-3xl font-bold p-3">
                StudyNook
            </div></Link>




            {/* mid/navbar */}
            <div>

            </div>






            {/* auth */}
            <div>
                {
                    (!user ? <div className="flex gap-4 items-center">

                        <Link href={"/login"}>
                            <Button variant="outline" className={"rounded-none bg-green-100 text-green-500"}>Login</Button>
                        </Link>
                        <Link  href={"/signup"}>
                            <Button variant="outline" className={"rounded-none bg-green-100 text-green-500"}>SignUp</Button>
                        </Link>

                    </div> : 
                    <div className="flex gap-4 items-center"> 
                        <p>Welcome {user.name}</p>
                       <Button variant="danger" onClick={() => {
                        signOut()
                       }}>SignOut</Button> 
                    </div>
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
