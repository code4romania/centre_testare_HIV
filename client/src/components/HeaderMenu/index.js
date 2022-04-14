import { NavLink } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { HeaderMenuType } from '../../types';

export const HeaderMenu = ({ menuItems, showMenu, endAction }) => {
  const menuClasses = classNames('App-menu', { show: showMenu });

  return (
    <ul className={menuClasses}>
      {menuItems.map(({ to, label, className }) => (
        <li key={to}>
          <NavLink
            className={classNames('menu-item', { [className]: className })}
            to={to}
            exact
            activeClassName="active"
          >
            {label}
          </NavLink>
        </li>
      ))}
      {endAction}
    </ul>
  );
};

HeaderMenu.defaultProps = {
  showMenu: false,
  endAction: null,
};

HeaderMenu.propTypes = HeaderMenuType;

export default { HeaderMenu };
