import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { en, ro } from 'make-plural/plurals';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './containers/home';
import About from './containers/about';
import Centers from './containers/centers';
import Blog from './containers/blog';
import BlogPost from './containers/blog-post';
import Contact from './containers/contact';
import Terms from './containers/Terms';
import Policy from './containers/policy';
import NotFound from './containers/404/404';
import ScrollToTop from './components/ScrollToTop';
import './styles/theme.scss';
import { messages as messagesRo } from './locales/ro/messages';
import { HelpUsDialog } from './components/HelpUsDialog';

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
  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <QueryClientProvider client={queryClient}>
        <HelpUsDialog />
        <Router>
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
            <Route component={NotFound} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </I18nProvider>
  );
};

export default App;
