import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// eslint-disable-next-line import/order
import Ticket from '../Ticket';
import MoreTicketButton from '../MoreTicketsButton';
import { fetchFirstChapterTickets, fetchAllTickets, selectAllTickets } from '../../features/Tickets/ticketsPostSlice';
import { selectFilters } from '../../features/TicketFilters/filtersCheckboxesSlice';

import './TicketsList.modules.scss';

const passesFilters = (ticket, filters) => {
  const { segments } = ticket;

  // Проверяем каждый сегмент на соответствие фильтрам
  for (let i = 0; i < segments.length; i++) {
    const stopsCount = segments[i].stops.length;

    if (filters.isAllFilter) {
      continue; // Продолжаем проверку следующего сегмента
    }
    if (filters.isNoTransferFilter && stopsCount === 0) {
      continue; // Продолжаем проверку следующего сегмента
    }
    if (filters.isOneTransfer && stopsCount === 1) {
      continue; // Продолжаем проверку следующего сегмента
    }
    if (filters.isTwoTransfer && stopsCount === 2) {
      continue; // Продолжаем проверку следующего сегмента
    }
    if (filters.isThreeTransfer && stopsCount === 3) {
      continue; // Продолжаем проверку следующего сегмента
    }

    return false; // Сегмент не прошел проверку по одному из фильтров
  }

  return true; // Все сегменты билета прошли проверку
};

function TicketsList({ currentTicketsPage, setCurrentTicketsPage }) {
  const [currentTickets, setCurrentTickets] = useState([]);
  const dispatch = useDispatch();
  const tickets = useSelector(selectAllTickets);
  const filters = useSelector(selectFilters);
  const postStatus = useSelector((state) => state.ticketsPost.status);

  useEffect(() => {
    const filteredTickets = tickets.filter((item) => passesFilters(item, filters));
    const curentTicketCount = currentTicketsPage * 5;
    if (tickets.length) {
      setCurrentTickets(() => {
        return filteredTickets.slice(0, curentTicketCount);
      });
    }
  }, [currentTicketsPage, tickets, filters]);

  useEffect(() => {
    const filteredTickets = tickets.filter((item) => passesFilters(item, filters));
    const curentTicketCount = 1 * 5;
    if (tickets.length) {
      setCurrentTickets(() => {
        return filteredTickets.slice(0, curentTicketCount);
      });
    }
  }, [tickets]);

  useEffect(() => {
    async function getTickets() {
      dispatch(fetchFirstChapterTickets());
    }
    async function getAllTickets() {
      dispatch(fetchAllTickets());
    }
    getTickets();
    getAllTickets();
  }, []);

  return (
    <div className="tickets-list tickets">
      {postStatus === 'loading' ? <div className="loader"></div> : null}
      {currentTickets.length ? (
        currentTickets.map((data) => {
          return <Ticket className="ticket" key={`${data.price} ${data.carrier}`} data={data} />;
        })
      ) : (
        <div className="tickets-alert">Рейсов, подходящих под заданные фильтры, не найдено</div>
      )}
      {currentTickets.length ? <MoreTicketButton setCurrentTicketsPage={setCurrentTicketsPage} /> : null}
    </div>
  );
}

export default TicketsList;
