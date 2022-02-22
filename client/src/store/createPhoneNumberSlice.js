export const createPhoneNumberSlice = (set) => ({
  showPhoneNumber: false,
  setShowPhoneNumber: () => {
    set({ showPhoneNumber: true });
  },
});

export default { createPhoneNumberSlice };
