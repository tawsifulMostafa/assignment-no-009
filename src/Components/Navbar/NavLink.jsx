"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={pathname === href ? "text-green-500  fond-bold underline" : ""}
    >
      {children}
    </Link>
  );
};

export default NavLink;