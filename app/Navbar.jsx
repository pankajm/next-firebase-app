"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "./context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = useAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (ex) {
      // The error must be logged to some remote loggin service.
      console.log(ex);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="flex bg-slate-300 p-5 justify-between">
      <div className="flex">
        <Link href="/">Home</Link>
        <Link href="/profile" className="mx-5">
          Profile
        </Link>
        <Link href="/about">About</Link>
      </div>
      <div className="flex">
        {!user ? (
          <>
            <div onClick={handleSignIn} className="cursor-pointer">
              Login
            </div>
          </>
        ) : (
          <>
            <div>Welcome, {user.displayName}</div>
            <div className="cursor-pointer ml-4" onClick={handleSignOut}>
              SignOut
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
