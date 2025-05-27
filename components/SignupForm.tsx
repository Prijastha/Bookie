"use client";
import { SignupFormInputs, signupSchema } from "@/lib/validation";
import {
  signupFailure,
  signupStart,
  signupSuccess,
} from "@/redux/slices/signupSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = async (data: SignupFormInputs) => {
    dispatch(signupStart());
    try {
      await new Promise((res) => setTimeout(res, 1000));
      const fakeToken = "000000";
      dispatch(
        signupSuccess({ user: { email: data.email }, token: fakeToken })
      );
      reset();
      router.push("/login");
    } catch (err) {
      dispatch(signupFailure("Sign up failed. Please try again."), err);
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
        <label htmlFor="" className="block mb-1 font-medium text-gray-800">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder="Enter password"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="" className="block mb-1 font-medium text-gray-800">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-200 py-2 rounded cursor-pointer"
      >
        {isSubmitting ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}; 

export default SignupForm;
