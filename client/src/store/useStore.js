import create from 'zustand';
import { createCenterDetailsDialogSlice } from './createCenterDetailsDialogSlice';
import { createHelpUsDialogSlice } from './createHelpUsDialogSlice';

import { createMapSlice } from './createMapSlice';
import { createPhoneNumberSlice } from './createPhoneNumberSlice';
import { createSelectedCenterPkSlice } from './createSelectedCenterPkSlice';

export const useStore = create((set) => ({
  ...createSelectedCenterPkSlice(set),
  ...createMapSlice(set),
  ...createPhoneNumberSlice(set),
  ...createCenterDetailsDialogSlice(set),
  ...createHelpUsDialogSlice(set),
}));

export default useStore;
