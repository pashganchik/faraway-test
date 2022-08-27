import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import { getLocaleInfo } from './utils/locale';

import Footer from './components/shared/Footer/Footer';
import PeoplePage from './components/pages/PeoplePage/PeoplePage';
import PersonPage from './components/pages/PersonPage/PersonPage';
import { WrapIntlProvider } from './utils/providers';

import './App.scss';
import './main.scss';

const App = (): React.ReactElement => {
  const localeInfo = useMemo(() => getLocaleInfo(), []);
  injectStyle();

  const appComponent = (
    <div className="app" dir={localeInfo.direction}>
      <ToastContainer />
      <BrowserRouter>
        <div className="appContent">
          <Switch>
            <Route exact path="/people">
              <PeoplePage />
            </Route>
            <Route exact path="/person/:personId">
              <PersonPage />
            </Route>
            <Route>
              <PeoplePage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );

  return <WrapIntlProvider locale={localeInfo.locale}>{appComponent}</WrapIntlProvider>;
};

export default App;
