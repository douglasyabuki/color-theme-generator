import { useState } from "react";

export const useSessionStorage = <T>(
  key: string,
  initialValue: T,
): { storedValue: T; setValue: (value: T) => void } => {
  const getStoredValue = (): T => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const setValue = (value: T) => {
    setStoredValue(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return { storedValue, setValue };
};
