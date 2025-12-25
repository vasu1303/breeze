import { useState, useCallback } from "react";

export function useConfetti() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setConfettiKey((prev) => prev + 1);
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  return {
    showConfetti,
    confettiKey,
    triggerConfetti,
  };
}
