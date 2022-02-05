import { arrayOf, bool, element, oneOfType, shape, string } from 'prop-types';

export const HeaderMenuType = {
  menuItems: arrayOf(
    shape({
      to: string.isRequired,
      label: oneOfType([string, element]).isRequired,
    }),
  ).isRequired,
  showMenu: bool,
  endAction: element,
};

export default { HeaderMenuType };
