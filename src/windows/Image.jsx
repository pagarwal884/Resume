import React from "react";

import WindowControls from "#/Components/WindowControls";
import WindowWrapper from "#/hoc/WindowWrapper";
import useWindowStore from "#/store/window";

const ImageWindow = () => {
  const { windows } = useWindowStore();
  const fileData = windows.imgfile?.data;

  if (!fileData) return null;

  const { name, imageUrl, image, subtitle } = fileData;
  const imageSrc = imageUrl || image;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2 className="font-semibold text-sm text-gray-700 truncate">{name}</h2>
        <span className="w-8" />
      </div>

      <div className="img-content">
        {imageSrc ? <img src={imageSrc} alt={name} className="img-image" /> : null}

        {subtitle ? <div className="img-body"><h3 className="img-subtitle">{subtitle}</h3></div> : null}
      </div>
    </>
  );
};

const ImageFileWindow = WindowWrapper(ImageWindow, "imgfile");

export default ImageFileWindow;
