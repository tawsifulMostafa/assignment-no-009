import NavbarClient from "./NavbarClient";
import { sessionCheck } from "@/app/lib/session";

const Navbar = async () => {
    const session = await sessionCheck();
    const user = session?.user
 
    return (
        <NavbarClient user={user} />
    );
};

export default Navbar;