"use client";

import Link from "next/link";

const SignUpPage = () => {
 
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-lg rounded-2xl">
        <div className="card-body px-10 py-10">
          <h2 className="text-center text-3xl font-bold mb-4">Sign Up</h2>
        
         
          <form  className="flex flex-col gap-4">
            <div className="form-control w-full">
              <label className="label pb-1">
                <span className="label-text font-medium">Name <span className="text-error">*</span></span>
              </label>
              <input name="name" type="text" required placeholder="Enter your name" className="input input-bordered w-full rounded-xl" />
            </div>

            <div className="form-control w-full">
              <label className="label pb-1">
                <span className="label-text font-medium">Image URL <span className="text-error">*</span></span>
              </label>
              <input name="image" type="text" required placeholder="https://example.com/photo.jpg" className="input input-bordered w-full rounded-xl" />
            </div>

            <div className="form-control w-full">
              <label className="label pb-1">
                <span className="label-text font-medium">Email <span className="text-error">*</span></span>
              </label>
              <input name="email" type="email" required placeholder="john@example.com" className="input input-bordered w-full rounded-xl" />
            </div>

            <div className="form-control w-full">
              <label className="label pb-1">
                <span className="label-text font-medium">Password <span className="text-error">*</span></span>
              </label>
              <input name="password" type="password" required minLength={8} placeholder="Enter your password" className="input input-bordered w-full rounded-xl" />
              <label className="label pt-1">
                <span className="label-text-alt text-base-content/50">At least 8 characters</span>
              </label>
            </div>

            <div className="flex gap-3 mt-2">
              <button type="submit" className="btn btn-primary rounded-full px-6">
                 <span className="">Submit</span> 
              </button>
              <button type="reset" className="btn btn-ghost border border-base-300 rounded-full px-6">Reset</button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm">Already have an account? </span>
            <Link href="/login" className="link link-primary text-sm">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;