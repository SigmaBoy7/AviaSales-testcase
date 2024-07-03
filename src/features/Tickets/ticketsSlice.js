import { createSlice } from '@reduxjs/toolkit';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: [],
});

// export const selectAllTickets = (state) => state.tickets;

// export const {} = ticketsSlice.actions;
export default ticketsSlice.reducer;
