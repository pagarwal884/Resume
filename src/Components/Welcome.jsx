import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{
        fontVariationSettings: `"wght" ${baseWeight}`,
        display: "inline-block",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.2) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${Math.round(weight)}`,
    });
  };

  const handleMouseMove = (e) => {
    const containerRect = container.getBoundingClientRect();

    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();

      const centerX =
        rect.left - containerRect.left + rect.width / 2;

      const distance = Math.abs(e.clientX - containerRect.left - centerX);

      const radius = 150;

      const influence = Math.max(0, 1 - distance / radius);

      const weight = base + (max - base) * influence;

      animateLetter(letter, weight);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.4));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);

  useEffect(() => {
    const cleanupTitle = setupTextHover(titleRef.current, "title");
    const cleanupSubtitle = setupTextHover(subTitleRef.current, "subtitle");

    return () => {
      cleanupTitle();
      cleanupSubtitle();
    };
  }, []);

  return (
    <section
      id="welcome"
      className="flex flex-col items-center justify-center min-h-screen text-center"
    >
      <p ref={subTitleRef}>
        {renderText(
          "Hey, I'm Piyush! Welcome to my",
          "text-3xl font-georama",
          FONT_WEIGHTS.subtitle.default
        )}
      </p>

      <h1 ref={titleRef} className="mt-7">
        {renderText(
          "Portfolio",
          "text-9xl italic font-georama",
          FONT_WEIGHTS.title.default
        )}
      </h1>

      <div className="small-screen mt-8">
        <p>This Portfolio is designed for Laptop/Tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;