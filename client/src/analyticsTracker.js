import ReactGA from 'react-ga';

export const initializeGA = () => {
  if (document.location.hostname !== 'testarehiv.edreptultau.ro') {
    return;
  }
  ReactGA.initialize('G-EDWX54WGNJ');
};

export const logPageView = (history) => {
  history.listen((location) => {
    const page = location.pathname || window.location.pathname;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  });
};
