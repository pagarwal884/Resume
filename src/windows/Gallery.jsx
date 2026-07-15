import React, { useState } from "react";
import clsx from "clsx";

import WindowControls from "#/Components/WindowControls";
import WindowWrapper from "#/hoc/WindowWrapper";
import { photosLinks, gallery } from "#/constants";
import useWindowStore from "#/store/window";

const Gallery = () => {
  const { openWindow } = useWindowStore();
  const [selectedCategory, setSelectedCategory] = useState("Library");

  const handleImageClick = (img) => {
    openWindow("imgfile", {
      name: "Gallery Image",
      imageUrl: img,
    });
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <span className="w-8" />
      </div>

      <div className="flex h-full bg-white">
        <div className="sidebar">
          <h2>Collections</h2>

          <ul>
            {photosLinks.map((link, index) => (
              <li
                key={link.id}
                onClick={() => setSelectedCategory(link.title)}
                className={clsx(
                  index === 0 && selectedCategory === "Library" ? "bg-blue-100 text-blue-700" : ""
                )}
              >
                <img src={link.icon} alt={link.title} />
                <p>{link.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map((item) => (
              <li
                key={item.id}
                onClick={() => handleImageClick(item.img)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img src={item.img} alt={`Gallery ${item.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const GalleryWindow = WindowWrapper(Gallery, "photos");

export default GalleryWindow;
