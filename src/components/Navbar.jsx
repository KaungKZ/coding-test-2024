"use client";

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { addedItems } = useAppContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [user] = useAuthState(auth);

  function handleOpenDropdown() {
    setOpenDropdown((prev) => !prev);
  }

  function handleSignout() {
    signOut(auth)
      .then((res) => {
        Cookies.remove("userToken");
        Cookies.remove("user");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <nav className="nav">
      <div className="nav__container fixed-width-nav">
        <ul className="nav__ul">
          <li className="nav__li home-li">
            <Link href="/" className="nav__link">
              <Image
                src="/images/home.svg"
                width={22}
                height={22}
                alt="Picture of the author"
              />
            </Link>
          </li>
          <div className="wrap">
            <li className="nav__li cart-li">
              <Link href="/cart" className="nav__link">
                <Image
                  src="/images/cart.svg"
                  width={22}
                  height={22}
                  alt="Picture of the author"
                />
                {addedItems.length > 0 ? (
                  <span className="cart-active-number">
                    {addedItems.length}
                  </span>
                ) : null}
              </Link>
            </li>
            <ul className="nav__li person-li">
              <button onClick={handleOpenDropdown}>
                <Image
                  src="/images/person.svg"
                  width={22}
                  height={22}
                  alt="Picture of the author"
                />
              </button>
              {openDropdown && (
                <div className="nav__dropdown">
                  {!user && (
                    <li className="nav__li signin-li">
                      <Link
                        href="/signin"
                        className="nav__link"
                        onClick={() => setOpenDropdown(false)}
                      >
                        Sign In
                      </Link>
                    </li>
                  )}
                  {user && (
                    <>
                      <li className="nav__li loggedin-li nav__link">
                        Logged in as {user.email}
                      </li>
                      <li className="nav__li signout-li nav__link">
                        <button onClick={handleSignout}>Logout</button>
                      </li>
                    </>
                  )}
                </div>
              )}
            </ul>
          </div>
        </ul>
      </div>
    </nav>
  );
}
