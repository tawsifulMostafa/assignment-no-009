import Link from "next/link";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    return (
        <NavbarClient user={user} />
    );
};

export default Navbar;