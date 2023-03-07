import React, {FC} from 'react';
import {FilterItem} from './filterItem';
import { IFilter } from "../types/types";

interface FilterListProps {
    filterList: IFilter[];
    onFilterClick: (filter: IFilter) => void
    isFilterChosen: (filter: IFilter) => boolean

}

export const FilterList:FC<FilterListProps> = ({ filterList, onFilterClick, isFilterChosen }) => {
    return (
        <>
            <h3>{filterList[0].filterGroup}</h3>
            <ul className='filter__list'>
                {filterList.map((filterItem, count) => {
                    return <FilterItem isFilterChosen={isFilterChosen} key={count} onFilterClick={onFilterClick} filterItem={filterItem}/>
                })}
            </ul>
        </>
    )
}