import React from "react";
import WindowWrapper from "#/hoc/WindowWrapper";
import { techStack } from "#/constants";
import { Check } from "lucide-react";

const Terminal = () => {
  return (
    <>
      <div className="window-header">
        <p>Window Controls</p>
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
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;