"use client";
import { LoginFormInputs, loginSchema } from "@/lib/validation";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AuthForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: LoginFormInputs) => {
    dispatch(loginStart());
    try {
      await new Promise((res) => setTimeout(res, 1000));
      const fakeToken = "123456";
      dispatch(loginSuccess({ user: { email: data.email }, token: fakeToken }));
      reset();
      router.push("/dashboard");
    } catch (err) {
      dispatch(loginFailure("Login failed. Please try again."));
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="" className="block mb-1 font-medium text-gray-800">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter email"
          {...register("email")}
          className="w-full border rounded px-3 py-2 mb-4"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="" className="block text-gray-800 mb-1 font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          {...register("password")}
          className="w-full border rounded px-3 py-2 mb-5"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-amber-800 text-white py-2 rounded "
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
