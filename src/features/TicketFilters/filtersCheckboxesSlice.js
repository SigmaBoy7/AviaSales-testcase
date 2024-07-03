import { createSlice } from '@reduxjs/toolkit';

const changeAllCkeckboxStatus = function (state, status) {
  Object.keys(state).forEach((key) => {
    state[key] = status;
  });
};

export const filtersCheckboxesSlice = createSlice({
  name: 'filtersCheckboxes',
  initialState: {
    isAllFilter: true,
    isNoTransferFilter: true,
    isOneTransfer: true,
    isTwoTransfer: true,
    isThreeTransfer: true,
  },
  reducers: {
    toggleCheckbox: (state, action) => {
      const filterName = action.payload;
      state[filterName] = !state[filterName];

      const allTransferChecked =
        state.isNoTransferFilter && state.isOneTransfer && state.isTwoTransfer && state.isThreeTransfer;

      if (allTransferChecked) {
        state.isAllFilter = true;
      } else {
        state.isAllFilter = false;
      }
    },
    toggleAllCheckbox: (state) => {
      const status = state.isAllFilter;

      if (status) {
        changeAllCkeckboxStatus(state, false);
      } else {
        changeAllCkeckboxStatus(state, true);
      }
    },
  },
});
export const selectFilters = (state) => state.filtersCheckboxes;

export const { toggleCheckbox, toggleAllCheckbox } = filtersCheckboxesSlice.actions;
export default filtersCheckboxesSlice.reducer;
