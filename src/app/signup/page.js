"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");

      // sign out function to make sure user will have to sign in again

      signOut(auth)
        .then((res) => {
          // Sign-out successful.
          router.push("/signin");
        })
        .catch((error) => {
          // An error happened.
        });
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="bg-white rounded-[10px] w-[550px] mx-auto px-6 py-12">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
              Sign Up your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md  bg-white/5 p-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-[#33a0ff] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 p-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#33a0ff] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleSignUp}
                  className="disabled:opacity-40 flex w-full justify-center rounded-md bg-[#33a0ff] text-white px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-[#33a0ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#33a0ff"
                >
                  Sign up
                </button>
                {error ? (
                  <span className="w-full mt-2 block text-center text-[#f44336] text-sm">
                    {error.includes("(auth/invalid-email)")
                      ? "Invalid email"
                      : error.includes("(auth/email-already-in-use)")
                      ? "Your email is already used, please use another email"
                      : ""}
                  </span>
                ) : (
                  <div className="h-[28px]"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
