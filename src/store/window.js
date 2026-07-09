import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(
  immer((set) => ({
    // State
    windows: WINDOW_CONFIG,
    nextZindex: INITIAL_Z_INDEX + 1,

    // Open a window
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];

        // Stop if the window doesn't exist
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZindex;
        win.data = data ?? win.data;

        state.nextZindex++;
      }),

    // Close a window
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        // Stop if the window doesn't exist
        if (!win) return;

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    // Bring a window to the front
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        // Stop if the window doesn't exist
        if (!win) return;

        win.zIndex = state.nextZindex;
        state.nextZindex++;
      }),
  }))
);

export default useWindowStore;