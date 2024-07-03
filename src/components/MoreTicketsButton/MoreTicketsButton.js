import React from 'react';

// import { changePage } from '../../features/Tickets/ticketsPostSlice';

import './MoreTicketsButton.modules.scss';

function MoreTicketButton({ setCurrentTicketsPage }) {
  function handleClick() {
    setCurrentTicketsPage((prevValue) => {
      const page = prevValue + 1;
      return page;
    });
  }
  return (
    <button onClick={handleClick} className="ticket-more-button">
      Показать еще 5 билетов!
    </button>
  );
}

export default MoreTicketButton;
