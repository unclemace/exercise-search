import React, {FC} from 'react';
import { IFilter } from '../types/types';

interface FilterItemProps {
    filterItem: IFilter;
    onFilterClick: (filter: IFilter) => void
    isFilterChosen: (filter: IFilter) => boolean
}

export const FilterItem:FC<FilterItemProps> = ({ filterItem, onFilterClick, isFilterChosen}) => {
    return (
        <li className={`filter__item ${isFilterChosen(filterItem)? 'active': ''}`} onClick={() => onFilterClick(filterItem)}>
           <span>{filterItem.name}</span>
        </li>
    );
}