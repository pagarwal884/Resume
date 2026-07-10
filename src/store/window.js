import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZindex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];

        if (!win) return;

        win.isOpen = true;
        win.isMinimized = false;
        win.zIndex = state.nextZindex;
        win.data = data ?? win.data;

        state.nextZindex++;
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        if (!win) return;

        win.isOpen = false;
        win.isMinimized = false;
        win.isMaximized = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    minimizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        if (!win) return;

        win.isMinimized = true;
      }),

    restoreWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        if (!win) return;

        win.isMinimized = false;
        win.isOpen = true;
        win.zIndex = state.nextZindex;

        state.nextZindex++;
      }),

    maximizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        if (!win) return;

        win.isMaximized = !win.isMaximized;
        win.zIndex = state.nextZindex;

        state.nextZindex++;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        if (!win) return;

        win.zIndex = state.nextZindex;
        state.nextZindex++;
      }),
  }))
);

export default useWindowStore;