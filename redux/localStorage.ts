export const loadState = (userEmail: string) => {
  if (typeof window === "undefined") return undefined;
  try {
    const key = `authState_${userEmail}`;
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};
export const saveState = (userEmail: string, state: any) => {
  if (typeof window === "undefined") return;
  try {
    const key = `authState_${userEmail}`;
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("could not save state", err);
  }
};
