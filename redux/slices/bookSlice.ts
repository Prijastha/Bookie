import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  image?: string;
  status: string;
};
type BookState = {
  books: Book[];
};

const initialState: BookState = {
  books:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("books") || "[]")
      : [],
};
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("books", JSON.stringify(state.books));
      }
    },
    removeBook(state, action: PayloadAction<number>) {
      state.books.splice(action.payload, 1);
      if (typeof window !== "undefined") {
        localStorage.setItem("books", JSON.stringify(state.books));
      }
    },
    updateBookStatus(
      state,
      action: PayloadAction<{ index: number; newStatus: string }>
    ) {
      const { index, newStatus } = action.payload;
      if (state.books[index]) {
        state.books[index].status = newStatus;
        if (typeof window !== "undefined") {
          localStorage.setItem("books", JSON.stringify(state.books));
        }
      }
    },
  },
});
export const { addBook, removeBook, updateBookStatus } = bookSlice.actions;
export default bookSlice.reducer;
