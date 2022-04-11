import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Layout, Menu } from 'antd';
import { DownOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../../images/active-citizens-fund-logo.png';

import { useGlobalContext } from '../../context';
import { HeaderMenu } from '../HeaderMenu';
import { useMenuItems } from '../../hooks';

const { Header: AntHeader } = Layout;

const LANGUAGES = {
  en: 'English',
  ro: 'Română',
};

const languageMenu = (langText, handleMenuClick) => {
  return (
    <Menu onClick={(e) => handleMenuClick(e.key)}>
      {langText.map((language) => (
        <Menu.Item key={language}>{language}</Menu.Item>
      ))}
    </Menu>
  );
};

const languageButtons = (langText, handleBtnClick) => {
  return (
    <div className="language-btn-mobile">
      <GlobalOutlined />
      {langText.map((language) => (
        <Button key={language} onClick={() => handleBtnClick(language)} type="link">
          {language}
        </Button>
      ))}
    </div>
  );
};

export const Header = () => {
  const { currentLanguage, languageChange } = useGlobalContext();
  const [langText, setLangText] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = useMenuItems();

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const filterLanguages = (currentLang) => {
    return Object.entries(LANGUAGES)
      .filter(([key]) => key !== currentLang)
      .map((pair) => pair[1]);
  };

  const handleLanguageBtnClick = (language) => {
    const locale = Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === language);
    languageChange(locale);
    setLangText(filterLanguages(locale));
  };

  useEffect(() => {
    setLangText(filterLanguages(currentLanguage));
  }, [currentLanguage]);

  return (
    <div className="navbar">
      <AntHeader className={showMenu ? 'overlay' : ''}>
        <div className="container">
          <div className="App-logo">
            <Link to="/">
              <img src={logo} alt="Active citizens fund logo" />
            </Link>
          </div>

          <HeaderMenu
            menuItems={menuItems}
            showMenu={showMenu}
            endAction={languageButtons(langText, handleLanguageBtnClick)}
          />

          <Dropdown
            className="language-btn-desktop"
            overlay={() => languageMenu(langText, handleLanguageBtnClick)}
            trigger={['click']}
          >
            <Button>
              <GlobalOutlined />
              <DownOutlined />
            </Button>
          </Dropdown>
          <Button className="App-menu-button" onClick={handleMenuClick}>
            <MenuOutlined />
          </Button>
          <div className={`overlay ${showMenu ? 'show' : ''}`} onClick={handleMenuClick} />
        </div>
      </AntHeader>
    </div>
  );
};

export default { Header };
