"use client";
import React, { useState } from "react";
import Link from "next/link";
// import SocialLogins from "./SocialLogins";
// import { doCredentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      //   const response = await doCredentialLogin(formData);

      //   if (!!response.error) {
      //     console.error(response.error);
      //     setError(response.error.message);
      //   } else {
      //     router.push("/dashboard");
      //   }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-100">
      <div className="bg-gray shadow-lg rounded-lg p-8 max-w-md w-full transform transition-all duration-500 ease-in-out hover:scale-105">
        <h1 className="text-3xl my-3">Login</h1>

        {/* Display error message if it exists */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Profile Picture */}
        <div className="flex justify-center mb-6 bg-red-600">
          <Image
            src="/logo.svg"
            alt="Profile"
            width={150}
            height={150}
            className="rounded-xl  shadow-lg py-5"
          />
        </div>

        {/* Login Form */}
        <form className="space-y-6 m-5" onSubmit={onSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-black-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 border border-black-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>

        {/* <SocialLogins /> */}

        <p className="my-3">
          Don&apos;t you have an account?
          <Link href="register" className="mx-2 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
