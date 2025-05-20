"use client";
import { logout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };
  if (!isAuthenticated) return null;
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.email}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </main>
  );
};

export default DashboardPage;
