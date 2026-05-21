"use client";

import React, { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = (user) => {
    const newErrors = {};
    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    const password = user.password || "";
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    }
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const validationErrors = validateForm(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    setLoading(false);

    if (data) {
      toast.success("Login successful! Welcome back ");
      router.push("/");
      router.refresh(); 
    }

    if (error) {
      toast.error(error.message || "Invalid email or password.");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-base-content">Login</h1>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl overflow-hidden p-6 sm:p-8">

          <form onSubmit={onSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-sm">
                  Email <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all duration-200 ${errors.email ? "border-error" : ""}`}
              />
              {errors.email && (
                <label className="label py-0.5">
                  <span className="label-text-alt text-error font-medium">{errors.email}</span>
                </label>
              )}
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-sm">
                  Password <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className={`input input-bordered w-full outline-none focus:outline-none border-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all duration-200 ${errors.password ? "border-error" : ""}`}
              />
              <p className="text-[11px] text-base-content/50 mt-1.5">
                At least 8 characters, 1 uppercase, 1 lowercase
              </p>
              {errors.password && (
                <label className="label py-0.5">
                  <span className="label-text-alt text-error font-medium">{errors.password}</span>
                </label>
              )}
            </div>

            {/* Submit */}
            <div className="form-control mt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl border-none shadow-md transition-all duration-300"
              >
                {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
              </button>
            </div>
          </form>

          <div className="divider my-5 text-xs text-base-content/40 uppercase tracking-wider">
            Or continue with
          </div>

          <div className="form-control  text-center items-center">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="btn btn-outline border-base-300 hover:bg-base-200 gap-3 font-semibold rounded-xl transition-colors duration-200"
            >
              <FcGoogle className="text-xl" /> Sign in with Google
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            New user?{" "}
            <Link href="/signUp" className="text-primary font-medium hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}