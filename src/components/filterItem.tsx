import React, {FC} from 'react';
import { FilterValue } from '../types/types';

interface FilterItemProps {
    filterValue: FilterValue;
    onFilterClick: (filter: FilterValue) => void
    isFilterChosen: (filter: FilterValue) => boolean
}

const FilterItem:FC<FilterItemProps> = ({ filterValue, onFilterClick, isFilterChosen}) => {
    const { value } = filterValue;
    return (
        <li className={`filter__item ${isFilterChosen(filterValue)? 'active': ''}`} onClick={() => onFilterClick(filterValue)}>
           <span>{value}</span>
        </li>
    );
}

export default FilterItem;