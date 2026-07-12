import React from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

import Navbar from "./Components/Navbar";
import Welcome from "./Components/Welcome";
import Dock from "./Components/Dock";
import TerminalWindow from "./windows/Terminal";
import Safari from "./windows/Safari";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <TerminalWindow />
      <Safari />
    </main>
  );
};

export default App;