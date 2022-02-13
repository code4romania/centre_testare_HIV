const { H } = window;

const userPinIcon =
  '<div class="user-pin-icon"><svg viewBox="8 6 32 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.314 33.9555L26.828 42.6049C26.4569 42.9835 26.0162 43.2839 25.5311 43.4889C25.0461 43.6938 24.5261 43.7993 24.001 43.7993C23.4759 43.7993 22.956 43.6938 22.4709 43.4889C21.9858 43.2839 21.5451 42.9835 21.174 42.6049L12.686 33.9555C10.4484 31.6747 8.92468 28.7688 8.30738 25.6054C7.69009 22.4419 8.00699 19.163 9.21801 16.1831C10.429 13.2032 12.4798 10.6563 15.111 8.86433C17.7421 7.0724 20.8355 6.11597 24 6.11597C27.1645 6.11597 30.2579 7.0724 32.889 8.86433C35.5202 10.6563 37.571 13.2032 38.782 16.1831C39.993 19.163 40.3099 22.4419 39.6926 25.6054C39.0753 28.7688 37.5516 31.6747 35.314 33.9555V33.9555Z" fill="currentColor"/><path d="M24 14C18.48 14 14 18.48 14 24C14 29.52 18.48 34 24 34C29.52 34 34 29.52 34 24C34 18.48 29.52 14 24 14ZM24 17C25.66 17 27 18.34 27 20C27 21.66 25.66 23 24 23C22.34 23 21 21.66 21 20C21 18.34 22.34 17 24 17ZM24 31.2C21.5 31.2 19.29 29.92 18 27.98C18.03 25.99 22 24.9 24 24.9C25.99 24.9 29.97 25.99 30 27.98C28.71 29.92 26.5 31.2 24 31.2Z" fill="white"/></svg></div>';

const defaultCenterIcon =
  '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hospital" class="svg-inline--fa fa-hospital fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 492v20H0v-20c0-6.627 5.373-12 12-12h20V120c0-13.255 10.745-24 24-24h88V24c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v72h88c13.255 0 24 10.745 24 24v360h20c6.627 0 12 5.373 12 12zM308 192h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-168 64h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12zm104 128h-40c-6.627 0-12 5.373-12 12v84h64v-84c0-6.627-5.373-12-12-12zm64-96h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zm-116 12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40zM182 96h26v26a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6V96h26a6 6 0 0 0 6-6V70a6 6 0 0 0-6-6h-26V38a6 6 0 0 0-6-6h-20a6 6 0 0 0-6 6v26h-26a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6z"></path></svg>';

const centerIcon = `<div class="center-icon">${defaultCenterIcon}</div>`;

const selectedCenterIcon = `<div class="center-icon selected">${defaultCenterIcon}</div>`;

export const HereMapDomIcons = {
  userPinDomIcon: new H.map.DomIcon(userPinIcon),
  centerDomIcon: new H.map.DomIcon(centerIcon),
  selectedCenterDomIcon: new H.map.DomIcon(selectedCenterIcon),
};

export default { HereMapDomIcons };
