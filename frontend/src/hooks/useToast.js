import { useState, useCallback } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((msg, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  }, []);

  return { toasts, add };
};
