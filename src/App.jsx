import React from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

import Navbar from "./Components/Navbar";
import Welcome from "./Components/Welcome";
import Dock from "./Components/Dock";
import TerminalWindow from "./windows/Terminal";
import Safari from "./windows/Safari";
import Resume from "./windows/Resume";
import Finder from "./windows/Finder";
import TextFileWindow from "./windows/Text";
import ImageFileWindow from "./windows/Image";
import Contact from "./windows/Contact";
import Home from "./Components/Home";


gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <TerminalWindow />
      <Safari />
      <Resume />
      <Finder />
      <TextFileWindow />
      <ImageFileWindow />
      <Contact />
      <Home />
    </main>
  );
};

export default App;