import { useRef, useEffect, useCallback } from 'react';

type DebounceFn<T extends unknown[]> = (...args: T) => void;

export const useDebounce = <T extends unknown[]>(
  callback: DebounceFn<T>,
  delay: number
): DebounceFn<T> => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const cleanup = (): void => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  useEffect(() => cleanup, []);

  return useCallback(
    (...args: T) => {
      cleanup();
      timeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};
