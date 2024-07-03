import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getTickets } from '../../apiWorker/apiWorker';

export const fetchFirstChapterTickets = createAsyncThunk('ticketsPost/fetchTickets', async () => {
  async function fetchData() {
    const data = await getTickets();

    if (!data.tickets.length) {
      return fetchData();
    }

    return data;
  }
  const data = await fetchData();
  return data;
});

export const fetchAllTickets = createAsyncThunk('ticketsPost/fetchAllTickets', async () => {
  let result = {
    tickets: [],
    stop: false,
  };

  async function fetchData() {
    const data = await getTickets();

    if (data.stop) {
      return result;
    }
    result.tickets.push(...data.tickets);
    result.stop = data.stop;

    return await fetchData();
  }
  const data = await fetchData();
  return data;
});

const ticketsPostSlice = createSlice({
  name: 'ticketsPost',
  initialState: {
    tickets: [],
    // currentTickets: [],
    curentTicketsPage: 0,
    isAll: false,
    status: 'idle',
    error: null,
    filterError: false,
  },

  extraReducers(builder) {
    builder
      .addCase(fetchFirstChapterTickets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFirstChapterTickets.fulfilled, (state, action) => {
        // Add any fetched posts to the array
        state.tickets = state.tickets.concat(action.payload.tickets);
      })
      .addCase(fetchFirstChapterTickets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.tickets = state.tickets.concat(action.payload.tickets);
      });
  },
});
export const selectAllTickets = (state) => state.ticketsPost.tickets;

export const selectIsAllFectched = (state) => state.ticketsPost.isAll;
export const selectFilterErrorFectched = (state) => state.ticketsPost.filterError;

export default ticketsPostSlice.reducer;
