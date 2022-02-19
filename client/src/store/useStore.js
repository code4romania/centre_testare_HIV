import create from 'zustand';

import { createMapSlice } from './createMapSlice';
import { createSelectedCenterPkSlice } from './createSelectedCenterPkSlice';

export const useStore = create((set) => ({
  ...createSelectedCenterPkSlice(set),
  ...createMapSlice(set),
}));

export default useStore;
