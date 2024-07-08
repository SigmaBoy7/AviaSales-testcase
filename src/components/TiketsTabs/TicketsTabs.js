import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './TicketsTabs.modules.scss';
import { toggleTab, selectActiveTab } from '../../features/TicketsTabs/ticketsTabs';

export default function TicketsTabs() {
  const dispatch = useDispatch();
  const activeTabaSelector = useSelector(selectActiveTab);

  function handleClickTab(e) {
    dispatch(toggleTab(e.target.value));
  }

  return (
    <div className="tickets-tabs">
      <button
        onClick={handleClickTab}
        value={'economyTab'}
        className={activeTabaSelector === 'economyTab' ? 'tabs-button tabs-button__active' : 'tabs-button'}
      >
        Самый дешевый
      </button>
      <button
        onClick={handleClickTab}
        value={'fastTab'}
        className={activeTabaSelector === 'fastTab' ? 'tabs-button tabs-button__active' : 'tabs-button'}
      >
        Самый быстрый
      </button>
      <button
        onClick={handleClickTab}
        value={'optimumTab'}
        className={activeTabaSelector === 'optimumTab' ? 'tabs-button tabs-button__active' : 'tabs-button'}
      >
        Оптимальный
      </button>
    </div>
  );
}
