import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// eslint-disable-next-line import/order
import './TicketFilters.modules.scss';

import { toggleCheckbox, toggleAllCheckbox } from '../../features/TicketFilters/filtersCheckboxesSlice';

function TicketFilters() {
  const dispatch = useDispatch();
  const filtersCheckboxes = useSelector((state) => state.filtersCheckboxes);
  const handleFilterChange = (e) => {
    dispatch(toggleCheckbox(e.target.value));
  };
  const handelEnableAllFilter = () => {
    dispatch(toggleAllCheckbox());
  };

  return (
    <div className="tickets-filters filters">
      <div className="filters-body">
        <h2 className="filters-title">Количество пересадок</h2>
        <ul className="filters-list">
          <li className="filters-filter filter">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                className="filter-input"
                onChange={handelEnableAllFilter}
                checked={filtersCheckboxes.isAllFilter}
              />
              <span className="filter-custom-checkbox"></span>
              <div className="filter-text">Все</div>
            </label>
          </li>
          <li className="filters-filter filter">
            <label className="filter-checkbox">
              <input
                value={'isNoTransferFilter'}
                type="checkbox"
                className="filter-input"
                onChange={handleFilterChange}
                checked={filtersCheckboxes.isNoTransferFilter}
              />
              <span className="filter-custom-checkbox"></span>
              <div className="filter-text">Без пересадок</div>
            </label>
          </li>
          <li className="filters-filter filter">
            <label className="filter-checkbox">
              <input
                value={'isOneTransfer'}
                type="checkbox"
                className="filter-input"
                onChange={handleFilterChange}
                checked={filtersCheckboxes.isOneTransfer}
              />
              <span className="filter-custom-checkbox"></span>
              <div className="filter-text">1 пересадка</div>
            </label>
          </li>
          <li className="filters-filter filter">
            <label className="filter-checkbox">
              <input
                value={'isTwoTransfer'}
                type="checkbox"
                className="filter-input"
                onChange={handleFilterChange}
                checked={filtersCheckboxes.isTwoTransfer}
              />
              <span className="filter-custom-checkbox"></span>
              <div className="filter-text">2 пересадки</div>
            </label>
          </li>
          <li className="filters-filter filter">
            <label className="filter-checkbox">
              <input
                value={'isThreeTransfer'}
                type="checkbox"
                className="filter-input"
                onChange={handleFilterChange}
                checked={filtersCheckboxes.isThreeTransfer}
              />
              <span className="filter-custom-checkbox"></span>
              <div className="filter-text">3 пересадки</div>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TicketFilters;
