"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [buttonEnable, setButtonEnable] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonEnable(true);
    }
  }, [user]);

  async function onSignup() {
    try {
      setLoading(true);
      const result = await axios.post("/api/user/signup", user);
      console.log("Signup Successful", result.data);

      router.push("/signin");
    } catch (e: any) {
      console.log("Signup Failed");
      toast.error(e.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <br />
      <label htmlFor="email">E-Mail</label>
      <input
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        placeholder="xyz@gmail.com"
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        placeholder="xyz"
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        placeholder="xyz@123"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
      >
        {buttonEnable ? "Sign Up" : "Fill all fields..."}
      </button>
      <Link href="/signin">Visit Sign In Page</Link>
    </div>
  );
}
