import SignupForm from "@/components/SignupForm";
import React from "react";

const SignupPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-amber-800">
          Sign Up
        </h2>
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;
