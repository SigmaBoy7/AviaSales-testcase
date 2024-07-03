import { configureStore } from '@reduxjs/toolkit';

import filtersCheckboxesReducer from '../features/TicketFilters/filtersCheckboxesSlice';
import ticketsReducer from '../features/Tickets/ticketsSlice';
import ticketsPostReducer from '../features/Tickets/ticketsPostSlice';

export const store = configureStore({
  reducer: {
    filtersCheckboxes: filtersCheckboxesReducer,
    tickets: ticketsReducer,
    ticketsPost: ticketsPostReducer,
  },
});

export default store;
