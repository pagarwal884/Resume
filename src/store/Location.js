import { locations } from "#/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const defaultLocation = locations.work;

const useLocationStore = create(
  immer((set) => ({
    activeLocation: defaultLocation,

    setActiveLocation: (location = null) =>
      set((state) => {
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = defaultLocation;
      }),
  }))
);

export default useLocationStore;