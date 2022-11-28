import ReactGA from 'react-ga';

export const initializeGA = () => {
  if (document.location.hostname !== 'testarehiv.edreptultau.ro') {
    return;
  }
  ReactGA.initialize('G-2GD7REP5RG');
};

export const logPageView = (history) => {
  history.listen((location) => {
    const page = location.pathname || window.location.pathname;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  });
};
