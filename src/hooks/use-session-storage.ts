import { useState } from "react";

export const useSessionStorage = <T>(
  key: string,
  initialValue: T,
): { storedValue: T; updateStoredValue: (value: T) => void } => {
  const getStoredValue = (): T => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const updateStoredValue = (value: T) => {
    const newValue = { ...storedValue, ...value };
    setStoredValue(newValue);
    try {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(
        "Failed to save to sessionStorage, using initial value instead.",
        error,
      );
      setStoredValue(initialValue);
    }
  };

  return { storedValue, updateStoredValue };
};
