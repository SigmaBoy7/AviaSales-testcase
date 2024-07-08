/* eslint-disable indent */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/order
import Ticket from '../Ticket';
import MoreTicketButton from '../MoreTicketsButton';
import { fetchFirstChapterTickets, fetchAllTickets, selectAllTickets } from '../../features/Tickets/ticketsPostSlice';
import { selectFilters } from '../../features/TicketFilters/filtersCheckboxesSlice';
import { selectActiveTab } from '../../features/TicketsTabs/ticketsTabs';

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
  const activeTabSelector = useSelector(selectActiveTab);
  const postStatus = useSelector((state) => state.ticketsPost.status);

  const filteredTickets = useMemo(() => {
    return tickets.filter((item) => passesFilters(item, filters));
  }, [tickets, filters]);

  useEffect(() => {
    let sortedTickets = [...filteredTickets]; // Создаем копию массива, чтобы не мутировать исходный

    let activeTab;
    for (let i in activeTabSelector) {
      if (activeTabSelector[i] === true) {
        activeTab = i;
      }
    }

    switch (activeTab) {
      case 'economyTab':
        sortedTickets = sortedTickets.sort((a, b) => a.price - b.price);
        console.log(sortedTickets);
        break;
      case 'fastTab':
        sortedTickets = sortedTickets.sort(
          (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
        );
        break;
      default:
        break;
    }

    const curentTicketCount = currentTicketsPage * 5;
    setCurrentTickets(sortedTickets.slice(0, curentTicketCount));
  }, [currentTicketsPage, filteredTickets, activeTabSelector]);

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
          return <Ticket className="ticket" key={uuidv4()} data={data} />;
        })
      ) : (
        <div className="tickets-alert">Рейсов, подходящих под заданные фильтры, не найдено</div>
      )}
      {currentTickets.length ? <MoreTicketButton setCurrentTicketsPage={setCurrentTicketsPage} /> : null}
    </div>
  );
}

export default TicketsList;
