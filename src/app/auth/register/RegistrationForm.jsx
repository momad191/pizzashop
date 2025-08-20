"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const RegistrationForm = () => {
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = (formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");
    const newErrors = {};

    if (!name) newErrors.name = "Full name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid.";
    }
    if (!password) newErrors.password = "Password is required.";
    if (!password2) newErrors.password2 = "Password confirmation is required.";
    if (password && password2 && password !== password2) {
      newErrors.password2 = "Passwords do not match.";
    }

    return newErrors;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        router.push("/dashboard");
      } else {
        setMsg("Registration failed. Please try again.");
      }
    } catch (e) {
      console.error(e.message);
      setMsg("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-100">
      <div className="bg-gray shadow-lg rounded-lg p-8 max-w-md w-full transform transition-all duration-500 ease-in-out hover:scale-105">
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

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create an Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 ease-in-out"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

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
              className="w-full px-4 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 ease-in-out"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

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
              className="w-full px-4 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 ease-in-out"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              className="w-full px-4 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 ease-in-out"
              placeholder="Confirm your password"
            />
            {errors.password2 && (
              <p className="text-red-500 text-sm">{errors.password2}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out"
            >
              Register
            </button>
          </div>
          {msg && <p className="text-red-500 text-center mt-4">{msg}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
