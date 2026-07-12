import React from "react";
import clsx from "clsx";
import { Search } from "lucide-react";

import WindowControls from "#/Components/WindowControls";
import WindowWrapper from "#/hoc/WindowWrapper";
import { locations } from "#/constants";
import useLocationStore from "#/store/Location";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();

  const renderLocationList = (items) =>
    items.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item)}
        className={clsx(
          "flex items-center gap-2 cursor-pointer",
          item.id === activeLocation?.id ? "active" : "not-active"
        )}
      >
        <img
          src={item.icon}
          alt={item.name}
          className="w-4 h-4 object-contain"
        />

        <p className="text-sm font-medium truncate">
          {item.name}
        </p>
      </li>
    ));

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon ml-auto" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favourite</h3>

            <ul>
              {renderLocationList(Object.values(locations))}
            </ul>
          </div>

          <div>
            <h3>Work</h3>

            <ul>
              {renderLocationList(locations.work.children)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;