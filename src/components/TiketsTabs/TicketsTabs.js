import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './TicketsTabs.modules.scss';
import { toggleTab, selectActiveTab } from '../../features/TicketsTabs/ticketsTabs';

export default function TicketsTabs() {
  const [activeTab, setActiveTab] = useState('');
  const dispatch = useDispatch();
  const activeTabSelector = useSelector(selectActiveTab);

  useEffect(() => {
    console.log(activeTabSelector);
    for (let i in activeTabSelector) {
      if (activeTabSelector[i] === true) {
        setActiveTab(i);
      }
    }
  }, [activeTabSelector]);

  function handleClickTab(e) {
    dispatch(toggleTab(e.target.value));
  }

  return (
    <div className="tickets-tabs">
      <button
        onClick={handleClickTab}
        value={'economyTab'}
        className={activeTab === 'economyTab' ? 'tabs-button tabs-button__active' : 'tabs-button'}
      >
        Самый дешевый
      </button>
      <button
        onClick={handleClickTab}
        value={'fastTab'}
        className={activeTab === 'fastTab' ? 'tabs-button tabs-button__active' : 'tabs-button'}
      >
        Самый быстрый
      </button>
      <button
        onClick={handleClickTab}
        value={'optimumTab'}
        className={activeTab === 'optimumTab' ? 'tabs-button tabs-button__active' : 'tabs-button'}
      >
        Оптимальный
      </button>
    </div>
  );
}
