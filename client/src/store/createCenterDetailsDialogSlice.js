export const createCenterDetailsDialogSlice = (set) => ({
  isOpen: false,
  details: null,
  open: (details) => {
    set({ isOpen: true, details });
  },
  close: () => {
    set({ isOpen: false, details: null });
  },
});

export default { createCenterDetailsDialogSlice };
