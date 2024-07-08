import { createSlice } from '@reduxjs/toolkit';

export const ticketsTabsSlice = createSlice({
  name: 'ticketsTabs',
  initialState: {
    economyTab: false,
    fastTab: false,
    optimumTab: false,
  },
  reducers: {
    toggleTab: (state, action) => {
      const tabsName = action.payload;
      Object.keys(state).forEach((tab) => {
        state[tab] = tab === tabsName ? !state[tab] : false;
      });
    },
  },
});
export const selectActiveTab = (state) => {
  return state.ticketsTabs;
};

export const { toggleTab } = ticketsTabsSlice.actions;
export default ticketsTabsSlice.reducer;
