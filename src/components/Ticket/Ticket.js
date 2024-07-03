import React from 'react';

import TicketSegment from '../TicketSegment';

import './Ticket.modules.scss';
import airLogo from './resources/S7 Logo.svg';

function Ticket({ data }) {
  return (
    <div className="ticket">
      <div className="ticket-wrapper">
        <header className="ticket-header">
          <div className="ticket-price">{data.price} Р</div>
          <div className="ticket-airline">
            <img src={airLogo} />
          </div>
        </header>
        <div className="ticket-body">
          <ul className="ticket-flights">
            {data.segments.map((segment) => {
              return <TicketSegment key={`${segment.date} ${segment.destination}`} segment={segment} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
