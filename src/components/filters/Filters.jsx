import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { filtersValue } from '../../redux/slices/filtersSlice';
import './FiltersStyle.scss';

const filterList = [
  { name: 'Нові', value: '-createdAt' },
  { name: 'Популярні', value: '-viewsCount' },
];

const Filters = () => {
  const dispatch = useDispatch();
  const { isSelectFilter } = useSelector((state) => state.filter);

  const onSelectValue = (i) => {
    dispatch(filtersValue(filterList[i].value));
  };

  return (
    <div className="filter">
      <div className="filter__content">
        <ul>
          {filterList.map((el, index) => (
            <li
              key={index}
              className={classNames('', { active: isSelectFilter === el.value })}
              onClick={() => onSelectValue(index)}>
              {el.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filters;
