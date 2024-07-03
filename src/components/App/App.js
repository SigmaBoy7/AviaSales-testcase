import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { createSearchSession } from '../../apiWorker/apiWorker';
import TicketFilters from '../TicketsFilters';
import TicketsList from '../TicketsList';
// eslint-disable-next-line import/no-named-as-default
import store from '../../store/store';

import './App.modules.scss';
import logo from './resources/Logo.svg';

function App() {
  const [currentTicketsPage, setCurrentTicketsPage] = useState(1);
  useEffect(() => {
    async function createSession() {
      try {
        const searchId = await createSearchSession();
        localStorage.setItem('searchId', searchId['searchId']);
      } catch (err) {
        console.assert(err); //Сделать сомпонент ошибки
      }
    }

    createSession();
  }, []);

  return (
    <div className="app">
      <div className="wrapper">
        <Provider store={store}>
          <header className="app-header">
            <div className="app-header__logo">
              <img src={logo} />
            </div>
          </header>
          <div className="body">
            <TicketFilters />
            <TicketsList currentTicketsPage={currentTicketsPage} setCurrentTicketsPage={setCurrentTicketsPage} />
          </div>
        </Provider>
      </div>
    </div>
  );
}

export default App;
