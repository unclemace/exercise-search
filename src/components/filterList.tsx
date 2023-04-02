import React, {FC} from 'react';
import FilterItem from './filterItem';
import { FilterValue, IFilter } from "../types/types";

interface FilterListProps {
    filterList: IFilter;
    onFilterClick: (filter: FilterValue) => void
    isFilterChosen: (filter: FilterValue ) => boolean
}

const FilterList:FC<FilterListProps> = ({ filterList, onFilterClick, isFilterChosen }) => {
    return (
        <div className="filter__list-item">
            <h3>{filterList.filterGroup}</h3>
            <div className='separator'></div>
            <ul className='filter__list'>
                {filterList.values.map((filterItem, count) => {
                    const filterValue: FilterValue = {
                        filterGroup: filterList.filterGroup,
                        value: filterItem
                    }
                    return <FilterItem
                        isFilterChosen={isFilterChosen}
                        key={count}
                        onFilterClick={onFilterClick}
                        filterValue={filterValue}/>
                })}
            </ul>
        </div>
    )
}

export default FilterList;