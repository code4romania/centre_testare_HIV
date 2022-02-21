import create from 'zustand';

import { createMapSlice } from './createMapSlice';
import { createPhoneNumberSlice } from './createPhoneNumberSlice';
import { createSelectedCenterPkSlice } from './createSelectedCenterPkSlice';

export const useStore = create((set) => ({
  ...createSelectedCenterPkSlice(set),
  ...createMapSlice(set),
  ...createPhoneNumberSlice(set),
}));

export default useStore;
