import React from 'react';

import { timeFormatForTicket, minutesToTime } from './utils';

function TicketSegment({ segment }) {
  return (
    <li className="ticket-flight">
      <div className="ticket-time">
        <div className="ticket-info-title">В пути</div>
        <div className="ticket-info-value">{minutesToTime(segment.duration)}</div>
      </div>

      <div className="ticket-date">
        <div className="ticket-info-title">
          {segment.origin} – {segment.destination}
        </div>
        <div className="ticket-info-value">
          {timeFormatForTicket(segment.date)} – {timeFormatForTicket(segment.date, segment.duration)}
        </div>
      </div>

      <div className="ticket-transfer">
        <div className="ticket-info-title">
          {segment.stops.length
            ? `${segment.stops.length} ${segment.stops.length === 1 ? 'пересадка' : 'пересадки'}`
            : 'без пересадок'}
        </div>
        <div className="ticket-info-value">{segment.stops.toString()}</div>
      </div>
    </li>
  );
}

export default TicketSegment;
