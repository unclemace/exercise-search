import React, {FC} from 'react';
import { IFilter } from '../types/types';

interface FilterItemProps {
    filterItem: IFilter;
    onFilterClick: (filter: IFilter) => void
    isFilterChosen: (filter: IFilter) => boolean;
}

export const FilterItem:FC<FilterItemProps> = ({filterItem, onFilterClick, isFilterChosen}) => {
    return (
        <li className='filter__item' onClick={() => onFilterClick(filterItem)}>
           <span>{filterItem.name}</span>
        </li>
    );
}