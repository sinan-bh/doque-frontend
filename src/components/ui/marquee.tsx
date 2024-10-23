import React, { useEffect, useRef, useState } from "react";

interface CustomMarqueeProps {
  text: string;
  delay?: number;
}

const CustomMarquee: React.FC<CustomMarqueeProps> = ({ text, delay = 2 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  const checkOverflow = () => {
    if (containerRef.current) {
      const isOverflowing =
        containerRef.current.scrollWidth > containerRef.current.clientWidth;
      setShouldMarquee(isOverflowing);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="inline-block overflow-hidden whitespace-nowrap w-full"
    >
      {shouldMarquee ? (
        <div
          className={`inline-block animate-marquee`}
          style={{ animationDuration: `${text.length / 10 + delay}s` }}
        >
          {text}
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default CustomMarquee;
