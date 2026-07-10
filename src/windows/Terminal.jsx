import React from "react";
import WindowWrapper from "#/hoc/WindowWrapper";
import { techStack } from "#/constants";
import { Check, Flag } from "lucide-react";
import WindowControls from "#/Components/WindowControls";

const Terminal = () => {
  return (
    <div>
      <div id="window-header" >
        <WindowControls target="terminal"/>
        <h2>Terminal</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@piyush % </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <div className="flex items-center gap-2">
                <Check className="check" size={20} />
                <h3>{category}</h3>
              </div>

              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stack loaded successfully (100%)
          </p>

          <p>
            <Flag size={15} fill="black" />
            Render time: 6ms
          </p>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;