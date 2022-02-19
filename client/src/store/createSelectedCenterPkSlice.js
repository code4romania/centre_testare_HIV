export const createSelectedCenterPkSlice = (set) => ({
  selectedCenterPk: null,
  setSelectedCenterPk: (center) => {
    set({ selectedCenterPk: center });
  },
  clearSelectedCenterPk: () => {
    set({ selectedCenterPk: null });
  },
});

export default { createSelectedCenterPkSlice };
