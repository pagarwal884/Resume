import React from "react";
import useWindowStore from "#/store/window";

const WindowControls = ({ target }) => {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
  } = useWindowStore();

  return (
    <div id="window-controls">
      <button
        type="button"
        className="close"
        onClick={() => closeWindow(target)}
        aria-label="Close"
      />

      <button
        type="button"
        className="minimize"
        onClick={() => minimizeWindow(target)}
        aria-label="Minimize"
      />

      <button
        type="button"
        className="maximize"
        onClick={() => maximizeWindow(target)}
        aria-label="Maximize"
      />

    </div>
  );
};

export default WindowControls;