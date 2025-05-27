import AuthForm from "@/components/AuthForm";
import React from "react";

const LoginPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-400">Login</h2>
        <AuthForm />
      </div>
    </main>
  );
};

export default LoginPage;
