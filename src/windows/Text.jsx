import React from "react";

import WindowControls from "#/Components/WindowControls";
import WindowWrapper from "#/hoc/WindowWrapper";
import useWindowStore from "#/store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const fileData = windows.txtfile?.data;

  if (!fileData) return null;

  const { name, image, subtitle, description = [] } = fileData;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2 className="font-semibold text-sm text-gray-700 truncate">{name}</h2>
        <span className="w-8" />
      </div>

      <div className="txt-content">
        {image ? <img src={image} alt={name} className="txt-image h-full" /> : null}

        <div className="txt-body">
          {subtitle ? <h3 className="txt-subtitle">{subtitle}</h3> : null}

          {description.length > 0 ? (
            <div className="txt-paragraphs">
              {description.map((paragraph, index) => (
                <p key={`${name}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

const TextFileWindow = WindowWrapper(Text, "txtfile");

export default TextFileWindow;
