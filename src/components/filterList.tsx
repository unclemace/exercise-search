import React, {FC} from 'react';
import {FilterItem} from './filterItem';
import { IFilter } from "../types/types";

interface FilterListProps {
    filterList: IFilter[];
    onFilterClick: (filter: IFilter) => void

}

export const FilterList:FC<FilterListProps> = ({filterList, onFilterClick}) => {
    return (
        <>
            <h3>{filterList[0].filterGroup}</h3>
            <ul className='filter__list'>
                {filterList.map((filterItem, count) => {
                    return <FilterItem key={count} onFilterClick={onFilterClick} filterItem={filterItem}/>
                })}
            </ul>
        </>
    )
}