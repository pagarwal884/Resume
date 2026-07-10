import React, { useRef } from "react";
import useWindowStore from "#/store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();

    const ref = useRef(null);

    // Always provide a fallback to avoid conditional hooks
    const windowState = windows[windowKey] || {
      isOpen: false,
      zIndex: 1,
    };

    const { isOpen, zIndex } = windowState;

    // Opening animation
    useGSAP(
      () => {
        const el = ref.current;
        if (!el || !isOpen) return;

        gsap.fromTo(
          el,
          {
            scale: 0.8,
            opacity: 0,
            y: 40,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power3.out",
            clearProps: "transform",
          }
        );
      },
      {
        dependencies: [isOpen],
      }
    );

    // Make window draggable
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const draggable = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });

      return () => {
        draggable.forEach((d) => d.kill());
      };
    }, []);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          display: isOpen ? "block" : "none",
          zIndex,
        }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;