const { H } = window;

export const HereMapDomIconFactory = {
  makeMarkerIcon: (className, category) => {
    let categoryClassName = '';
    if (category) categoryClassName = `marker-${category.toLowerCase().split('/').join('')}`;

    const markerSvg =
      `<div class="marker ${className} ${categoryClassName}">` +
      `<svg width="34" height="39" viewBox="0 0 34 39"xmlns="http://www.w3.org/2000/svg">` +
      `<path d="M28.314 28.3134L19.828 36.7994C19.4569 37.1709 19.0162 37.4656 18.5311 37.6667C18.046 37.8677 17.5261 37.9712 17.001 37.9712C16.4759 37.9712 15.956 37.8677 15.4709 37.6667C14.9858 37.4656 14.5451 37.1709 14.174 36.7994L5.686 28.3134C3.44845 26.0757 1.92468 23.2248 1.30738 20.1211C0.690082 17.0175 1.00698 13.8004 2.21801 10.8769C3.42904 7.95331 5.4798 5.4545 8.11097 3.69643C10.7421 1.93836 13.8355 1 17 1C20.1645 1 23.2579 1.93836 25.889 3.69643C28.5202 5.4545 30.571 7.95331 31.782 10.8769C32.993 13.8004 33.3099 17.0175 32.6926 20.1211C32.0753 23.2248 30.5516 26.0757 28.314 28.3134Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<text style="fill: rgb(255, 249, 249); font-size: 12px; white-space: pre; text-anchor: middle; font-weight: 700; user-select: none;" x="17" y="20">${
        category ? category.toUpperCase() : ''
      }</text>` +
      `</svg></div>`;

    return new H.map.DomIcon(markerSvg);
  },
  makeUserPinIcon: () => {
    const userPinIcon =
      '<div class="user-pin-icon"><svg viewBox="8 6 32 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.314 33.9555L26.828 42.6049C26.4569 42.9835 26.0162 43.2839 25.5311 43.4889C25.0461 43.6938 24.5261 43.7993 24.001 43.7993C23.4759 43.7993 22.956 43.6938 22.4709 43.4889C21.9858 43.2839 21.5451 42.9835 21.174 42.6049L12.686 33.9555C10.4484 31.6747 8.92468 28.7688 8.30738 25.6054C7.69009 22.4419 8.00699 19.163 9.21801 16.1831C10.429 13.2032 12.4798 10.6563 15.111 8.86433C17.7421 7.0724 20.8355 6.11597 24 6.11597C27.1645 6.11597 30.2579 7.0724 32.889 8.86433C35.5202 10.6563 37.571 13.2032 38.782 16.1831C39.993 19.163 40.3099 22.4419 39.6926 25.6054C39.0753 28.7688 37.5516 31.6747 35.314 33.9555V33.9555Z" fill="currentColor"/><path d="M24 14C18.48 14 14 18.48 14 24C14 29.52 18.48 34 24 34C29.52 34 34 29.52 34 24C34 18.48 29.52 14 24 14ZM24 17C25.66 17 27 18.34 27 20C27 21.66 25.66 23 24 23C22.34 23 21 21.66 21 20C21 18.34 22.34 17 24 17ZM24 31.2C21.5 31.2 19.29 29.92 18 27.98C18.03 25.99 22 24.9 24 24.9C25.99 24.9 29.97 25.99 30 27.98C28.71 29.92 26.5 31.2 24 31.2Z" fill="white"/></svg></div>';

    return new H.map.DomIcon(userPinIcon);
  },
};

export default { HereMapDomIconFactory };
