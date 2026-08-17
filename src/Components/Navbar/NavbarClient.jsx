"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import NavLink from "./NavLink";
import ProfileDropDown from "./ProfileDropDown/ProfileDropDown";

const NavbarClient = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-200">
      <div className="flex justify-between items-center p-4 sm:p-5">

        <Link href="/" onClick={() => setIsOpen(false)}>
          <div className="text-2xl sm:text-3xl font-bold">
            StudyNook
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-4 items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/rooms">Rooms</NavLink>

          {user && (
            <>
              <NavLink href="/add-rooms">Add Rooms</NavLink>
              <NavLink href="/my-listings">My Listings</NavLink>
              <NavLink href="/my-bookings">My Bookings</NavLink>
            </>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:block">
          {!user ? (
            <div className="flex gap-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-none bg-green-100 text-green-500"
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  variant="outline"
                  className="rounded-none bg-green-100 text-green-500"
                >
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <ProfileDropDown user={user} />
          )}
        </div>

        {/* Hamburger */}
        <Button
          isIconOnly
          variant="light"
          className="md:hidden text-2xl"
          onPress={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </Button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-5 pb-5">
          <div className="flex flex-col gap-4 border-t pt-4">

            <NavLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>

            <NavLink href="/rooms" onClick={() => setIsOpen(false)}>
              Rooms
            </NavLink>

            {user && (
              <>
                <NavLink href="/add-rooms" onClick={() => setIsOpen(false)}>
                  Add Rooms
                </NavLink>

                <NavLink href="/my-listings" onClick={() => setIsOpen(false)}>
                  My Listings
                </NavLink>

                <NavLink href="/my-bookings" onClick={() => setIsOpen(false)}>
                  My Bookings
                </NavLink>

                <ProfileDropDown user={user} />
              </>
            )}

            {!user && (
              <div className="flex gap-3">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="rounded-none bg-green-100 text-green-500"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="rounded-none bg-green-100 text-green-500"
                  >
                    SignUp
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarClient;