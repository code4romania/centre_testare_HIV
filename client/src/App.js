import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { en, ro } from 'make-plural/plurals';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './containers/home';
import About from './containers/about';
import Centers from './containers/centers';
import Blog from './containers/blog';
import BlogPost from './containers/blog-post';
import CenterReview from './containers/center-review';
import Contact from './containers/contact';
import Terms from './containers/Terms';
import Donate from './containers/donate';
import Policy from './containers/policy';
import NotFound from './containers/404/404';
import ScrollToTop from './components/ScrollToTop';
import './styles/theme.scss';
import { messages as messagesRo } from './locales/ro/messages';
import { HelpUsDialog } from './components/HelpUsDialog';
import { logPageView } from './analyticsTracker';

const queryClient = new QueryClient();

i18n.loadLocaleData({
  en: { plurals: en },
  ro: { plurals: ro },
});
i18n.load({
  ro: messagesRo,
});
i18n.activate('ro');

const App = () => {
  const history = useHistory();
  useEffect(() => {
    logPageView(history);
  }, [history]);

  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <QueryClientProvider client={queryClient}>
        <HelpUsDialog />
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/despre">
            <About />
          </Route>
          <Route path="/centre">
            <Centers />
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
          <Route path="/blog/:slug">
            <BlogPost />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/termeni-si-conditii">
            <Terms />
          </Route>
          <Route path="/politica-de-confidentialitate">
            <Policy />
          </Route>
          <Route path="/chestionar">
            <CenterReview />
          </Route>
          <Route path="/doneaza">
            <Donate />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </QueryClientProvider>
    </I18nProvider>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
