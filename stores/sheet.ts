import { create } from "zustand";

type State = {
  open: boolean;
};

type Action = {
  setOpen: (model: State["open"]) => void;
};

const useSheetStore = create<State & Action>((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open })),
}));

export { useSheetStore };
