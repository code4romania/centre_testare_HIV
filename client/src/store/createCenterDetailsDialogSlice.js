export const createCenterDetailsDialogSlice = (set) => ({
  isCenterDetailsDialogOpen: false,
  details: null,
  openCenterDetailsDialog: (details) => {
    set({ isCenterDetailsDialogOpen: true, details });
  },
  closeCenterDetailsDialog: () => {
    set({ isCenterDetailsDialogOpen: false, details: null });
  },
});

export default { createCenterDetailsDialogSlice };
