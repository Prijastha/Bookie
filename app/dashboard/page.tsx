"use client";
import AddBookForm from "@/components/AddBookForm";
import { logout } from "@/redux/slices/authSlice";
import { removeBook, updateBookStatus } from "@/redux/slices/bookSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
const DashboardPage = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const books = useSelector((state: RootState) => state.book.books);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  if (!isAuthenticated) return null;
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">
            Hi, {user?.email.split("@")[0]}
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500  hover:text-red-500 transition"
          >
            Logout
          </button>
        </header>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium mb-4">📚 Your Reading List</h2>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="border px-4 py-2 rounded hover:bg-amber-50 text-sm"
          >
            {showForm ? "close" : "➕ Add Book"}
          </button>
          {/* {showForm && <AddBookForm onClose={() => setShowForm(false)} />} */}
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
              <AddBookForm onClose={() => setShowForm(false)} />
            </motion.div>
          </div>
        )}

        {/* <section>
          {books.length === 0 ? (
            <p className="text-gray-500">No books added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="bg-white p-4 flex rounded-lg shadow-md border gap-4 "
                >
                  {book.image && (
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={150}
                      height={80}
                      className="  object-cover rounded"
                    />
                  )}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{book.title}</h3>
                    <p className="text-gray-700">Author: {book.author}</p>
                    <p className="text-gray-500 text-sm italic">Genre: {book.genre}</p>
                    <button
                      onClick={() => dispatch(removeBook(index))}
                      className="text-sm text-red-500 underline hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section> */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["To Read", "Currently Reading", "Read"].map((status) => (
            <div key={status} className="bg-gray-50 p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-4 text-center">{status}</h3>
              <div className="space-y-4">
                {books
                  .filter((book) => book.status === status)
                  .map((book, index) => {
                    const actualIndex = books.findIndex(
                      (b) =>
                        b.title === book.title &&
                        b.author === book.author &&
                        b.genre === book.genre &&
                        b.status === book.status
                    );

                    return (
                      <div
                        key={index}
                        className="bg-white p-3 rounded shadow flex flex-col items-center"
                      >
                        {book.image && (
                          <Image
                            src={book.image}
                            alt={book.title}
                            width={100}
                            height={100}
                            className="rounded mb-2 object-cover"
                          />
                        )}
                        <h4 className="text-md font-semibold">{book.title}</h4>
                        <p className="text-sm text-gray-600">
                          by {book.author}
                        </p>
                        <p className="text-xs italic text-gray-500">
                          {book.genre}
                        </p>

                        <select
                          value={book.status}
                          onChange={(e) =>
                            dispatch(
                              updateBookStatus({
                                index: actualIndex,
                                newStatus: e.target.value,
                              })
                            )
                          }
                          className="mt-2 text-sm border rounded px-2 py-1"
                        >
                          <option value="To Read">To Read</option>
                          <option value="Currently Reading">
                            Currently Reading
                          </option>
                          <option value="Read">Read</option>
                        </select>

                        <button
                          onClick={() => dispatch(removeBook(actualIndex))}
                          className="text-xs text-red-500 mt-1 underline hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
