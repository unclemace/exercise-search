import React, {FC} from 'react';
import FilterItem from './filterItem';
import { IFilter } from "../types/types";

interface FilterListProps {
    filterList: IFilter[];
    onFilterClick: (filter: IFilter) => void
    isFilterChosen: (filter: IFilter) => boolean

}

const FilterList:FC<FilterListProps> = ({ filterList, onFilterClick, isFilterChosen }) => {
    return (
        <div className="filter__list-item">
            <h3>{filterList[0].filterGroup}</h3>
            <div className='separator'></div>
            <ul className='filter__list'>
                {filterList.map((filterItem, count) => {
                    return <FilterItem isFilterChosen={isFilterChosen} key={count} onFilterClick={onFilterClick} filterItem={filterItem}/>
                })}
            </ul>
        </div>
    )
}

export default FilterList;