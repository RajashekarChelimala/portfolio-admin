import { useEffect, useRef, useState } from "react";

/**
 * AnimatedCounter — smoothly counts from 0 to target when in viewport.
 * @param {number} target - final number
 * @param {number} duration - animation duration in ms (default 1800)
 * @param {string} suffix - text appended after number (e.g. "+", "%", "ms")
 */
export default function AnimatedCounter({ target, duration = 1800, suffix = "" }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const numericTarget = parseInt(String(target).replace(/\D/g, "")) || 0;

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericTarget));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
