import { configureStore } from '@reduxjs/toolkit';

import filtersCheckboxesReducer from '../features/TicketFilters/filtersCheckboxesSlice';
import ticketsReducer from '../features/Tickets/ticketsSlice';
import ticketsPostReducer from '../features/Tickets/ticketsPostSlice';
import ticketsTabsRedurec from '../features/TicketsTabs/ticketsTabs';

export const store = configureStore({
  reducer: {
    filtersCheckboxes: filtersCheckboxesReducer,
    tickets: ticketsReducer,
    ticketsPost: ticketsPostReducer,
    ticketsTabs: ticketsTabsRedurec,
  },
});

export default store;
