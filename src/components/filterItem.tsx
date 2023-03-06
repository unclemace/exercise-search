import React, {FC} from 'react';
import { IFilter } from '../types/types';

interface FilterItemProps {
    filterItem: IFilter;
    onFilterClick: (filter: IFilter) => void
}

export const FilterItem:FC<FilterItemProps> = ({filterItem, onFilterClick}) => {
    const handleFilterClick = (filterItem: IFilter, event: React.MouseEvent<HTMLLIElement>) => {
        onFilterClick(filterItem);
        event.currentTarget.classList.toggle('active');

    }
    return (
        <li className='filter__item' onClick={(e) => handleFilterClick(filterItem, e)}>
           <span>{filterItem.name}</span>
        </li>
    );
}