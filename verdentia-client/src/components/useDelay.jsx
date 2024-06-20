import { useState, useEffect } from 'react';

const useDelay = (callback, delay) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, [callback, delay]);
};

export default useDelay;
