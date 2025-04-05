import { useEffect } from "react";

export const useOnMount = (callback: () => void): void => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};