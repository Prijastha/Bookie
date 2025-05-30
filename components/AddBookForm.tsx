"use client";
import { BookFormInputs, bookSchema } from "@/lib/validation";
import { addBook } from "@/redux/slices/bookSlice";
import { AppDispatch } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { lazy, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { uuidv4 } from "zod/v4";

type AddBookFormProps = {
  onClose: () => void;
};
const AddBookForm: React.FC<AddBookFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormInputs>({
    resolver: zodResolver(bookSchema),
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = (data: BookFormInputs) => {
    dispatch(addBook({ ...data, image: imagePreview || "", id: uuidv4() }));
    reset();
    setImagePreview(null);
    onClose();
  };
  return (
    // <form
    //   action=""
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="space-y-4 mt-6"
    // >
    //   <div>
    //     <label htmlFor="" className="block mb-1 font-medium text-gray-800">
    //       Title
    //     </label>
    //     <input
    //       type="text"
    //       {...register("title")}
    //       placeholder="Book title"
    //       className="w-full border px-3 py-2 rounded"
    //     />
    //     {errors.title && (
    //       <p className="text-sm text-red-500">{errors.title.message}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label htmlFor="" className="block mb-1 font-medium text-gray-800">
    //       Author
    //     </label>
    //     <input
    //       type="text"
    //       placeholder="Author"
    //       {...register("author", { required: true })}
    //       className="w-full border px-3 py-2 rounded"
    //     />
    //     {errors.author && (
    //       <p className="text-red-500 text-sm">{errors.author.message}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label htmlFor="" className="block mb-1 font-medium text-gray-800">
    //       Genre
    //     </label>
    //     <input
    //       type="text"
    //       placeholder="Genre"
    //       {...register("genre", { required: true })}
    //       className="w-full border px-3 py-2 rounded"
    //     />
    //     {errors.genre && (
    //       <p className="text-red-500 text-sm">{errors.genre.message}</p>
    //     )}
    //   </div>
    //   <div>
    //     <label htmlFor="" className="block mb-1 font-medium text-gray-800">
    //       Image
    //     </label>
    //     <input
    //       type="file"
    //       // placeholder="Image URL (optional)"
    //       accept="image/*"
    //       // {...register("image")}
    //       onChange={handleImageChange}
    //       className="w-full border px-3 py-2 rounded"
    //     />
    //     {imagePreview && (
    //       <Image
    //         width={80}
    //         height={100}
    //         src={imagePreview}
    //         alt="Preview"
    //         className=" object-cover rounded"
    //       />
    //     )}
    //   </div>

    //   <div className="flex gap-2">
    //     <button
    //       type="submit"
    //       className="  px-4 py-2 rounded cursor-pointer bg-amber-400"
    //     >
    //       Add Book
    //     </button>
    //     <button
    //       type="button"
    //       onClick={onClose}
    //       className=" px-4 py-2 rounded bg-red-600 text-white cursor-pointer"
    //     >
    //       Cancel
    //     </button>
    //   </div>
    // </form>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <div>
        <label className="block mb-1 font-medium text-gray-800">Title</label>
        <input
          type="text"
          {...register("title")}
          placeholder="Book title"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-800">Author</label>
        <input
          type="text"
          placeholder="Author"
          {...register("author")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-800">Genre</label>
        <input
          type="text"
          placeholder="Genre"
          {...register("genre")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.genre && (
          <p className="text-red-500 text-sm">{errors.genre.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-800">Status</label>
        <select
          {...register("status")}
          className="w-full border px-3 py-2 rounded cursor-pointer"
        >
          <option value="To Read">To Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Read">Read</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-800">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border px-3 py-2 rounded cursor-pointer"
        />
        {imagePreview && (
          <Image
            width={80}
            height={100}
            src={imagePreview}
            alt="Preview"
            className="object-cover rounded mt-2"
          />
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 rounded cursor-pointer bg-amber-100"
        >
          Add Book
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-red-600 text-white cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;
