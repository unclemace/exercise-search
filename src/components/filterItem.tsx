import React, {FC} from 'react';
import {EquipmentType, MuscleGroupType} from '../types/types';

interface FilterItemProps {
    filterItem: EquipmentType | MuscleGroupType;
    onFilterClick: (filter: EquipmentType | MuscleGroupType) => void
}

export const FilterItem:FC<FilterItemProps> = ({filterItem, onFilterClick}) => {
    return (
        <li className='filter__item' onClick={() => onFilterClick(filterItem)}>
           <span>{filterItem}</span>
        </li>
    );
}