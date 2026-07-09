import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tooltip } from "react-tooltip";

import { dockApps } from "#/constants";

const Dock = () => {
  // Reference to the dock container
  const dockRef = useRef(null);

  useGSAP(() => {
    const dockElement = dockRef.current;

    if (!dockElement) return;

    // Select all dock icons
    const dockIcons = dockElement.querySelectorAll(".dock-icon");

    // Animate icons based on mouse position
    const animateIcons = (mouseX) => {
      const { left: dockLeft } = dockElement.getBoundingClientRect();

      dockIcons.forEach((icon) => {
        const { left: iconLeft, width: iconWidth } =
          icon.getBoundingClientRect();

        // Find the center of the icon
        const iconCenter = iconLeft - dockLeft + iconWidth / 2;

        // Calculate distance between mouse and icon
        const distance = Math.abs(mouseX - iconCenter);

        // Convert distance into animation intensity
        const intensity = Math.exp(-(distance ** 2) / 2000);

        // Animate the icon
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    // Mouse move inside dock
    const handleMouseMove = (event) => {
      const { left: dockLeft } = dockElement.getBoundingClientRect();

      animateIcons(event.clientX - dockLeft);
    };

    // Reset icons when mouse leaves
    const handleMouseLeave = () => {
      dockIcons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    // Add event listeners
    dockElement.addEventListener("mousemove", handleMouseMove);
    dockElement.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners
    return () => {
      dockElement.removeEventListener("mousemove", handleMouseMove);
      dockElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  // Handle icon click
  const toggleApp = (app) => {
    // Open window logic
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={100}
              disabled={!canOpen}
              onClick={() =>
                toggleApp({ id, name, icon, canOpen })
              }
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}

        <Tooltip
          id="dock-tooltip"
          place="top"
          className="tooltip"
        />
      </div>
    </section>
  );
};

export default Dock;