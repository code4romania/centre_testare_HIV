export const createHelpUsDialogSlice = (set) => ({
  isHelpUsDialogOpen: false,
  openHelpUsDialog: () => {
    set({ isHelpUsDialogOpen: true });
  },
  closeHelpUsDialog: () => {
    set({ isHelpUsDialogOpen: false });
  },
});

export default { createHelpUsDialogSlice };
