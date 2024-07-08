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
export const selectAllTab = (state) => {
  return state.ticketsTabs;
};

export const selectActiveTab = (state) => {
  const { economyTab, fastTab, optimumTab } = state.ticketsTabs;

  if (economyTab) {
    return 'economyTab';
  } else if (fastTab) {
    return 'fastTab';
  } else if (optimumTab) {
    return 'optimumTab';
  } else {
    return null; // No active tab
  }
};

export const { toggleTab } = ticketsTabsSlice.actions;
export default ticketsTabsSlice.reducer;
