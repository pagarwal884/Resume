import { navLinks, navIcons } from "#/constants";
import React from "react";
import dayjs from "dayjs";
import useWindowStore from "#/store/window";

const Navbar = () => {

  const { openWindow } = useWindowStore()

  return (
    <nav>
      <div className="">
        <img src="/images/logo.svg" alt="Logo" />

        <p className="font-bold">Piyush's Portfolio</p>

        <ul className="">
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="">
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon-hover"/>
            </li>
          ))}
        </ul>

        <time datetime="">{dayjs().format('ddd MMM h:mm A')}</time>
      </div>
    </nav>
  );
};

export default Navbar;