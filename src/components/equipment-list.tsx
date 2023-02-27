import React, {FC} from 'react';
import {FilterItem} from './equipment-item';
import {EquipmentType, MuscleGroupType} from "../types/types";

interface FilterListProps {
    filterList: EquipmentType[] | MuscleGroupType[];
    onFilterClick: (filter: EquipmentType | MuscleGroupType) => void

}

export const FilterList:FC<FilterListProps> = ({filterList, onFilterClick}) => {
    return (
        <ul className='filter__list'>
            {filterList.map((filterItem, count) => {
                return <FilterItem key={count} onFilterClick={onFilterClick} filterItem={filterItem}/>
            })}
        </ul>
    )
}