// utils/authStorage.ts

// Load auth state from localStorage
export const loadState = () => {
  if (typeof window === "undefined") return undefined;
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Save auth state to localStorage
export const saveState = (state: unknown) => {
  if (typeof window === "undefined") return;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Clear auth state
export const clearState = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("authState");
  } catch (err) {
    console.error("Could not clear state", err);
  }
};
