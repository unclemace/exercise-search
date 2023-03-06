import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { FilterList } from '../components/filterList';
import { IFilter } from '../types/types';
import { addFilter, removeFilter, selectChosenFilters } from '../store/slices/exercisesSlice'

interface FilterContainerProps {
    filters: IFilter[]
}

export const FilterContainer: FC<FilterContainerProps> = ({filters}) => {
    const dispatch = useAppDispatch();
    const chosenFilters = useAppSelector(selectChosenFilters);
    const defineUniqueFilterGroups = (filters: IFilter[]) => {
        let uniqueGroup: string[] = [];
        filters.forEach(item => {
            if(!uniqueGroup.includes(item.filterGroup)){
                uniqueGroup.push(item.filterGroup)
            }
        })
        return uniqueGroup;
    }
    const sortByGroup = (filters: IFilter[], groups: string[]) => {
        let separatedByGroups: IFilter[][] = []
        groups.forEach(group => {
            separatedByGroups.push(filters.filter(item => item.filterGroup === group));
        })
        return separatedByGroups;
    }

    const layers = defineUniqueFilterGroups(filters);
    const sortedFilters = sortByGroup(filters, layers)

    const handleFilterClick = (filterChosen: IFilter) => {
        const filterFound = chosenFilters.find(filter => {
            return filter.filterGroup === filterChosen.filterGroup && filter.name === filterChosen.name;
        });
        if (filterFound) {
            dispatch(removeFilter(filterFound));
        }
        else {
            dispatch(addFilter(filterChosen));
        }
    }

    return (
         <section className='filter'>
            <header>
              <h2>Equipment selection</h2>
            </header>
            <div className='filter__container'>
                {
                    sortedFilters.map((filtersList, count) => {
                        return <FilterList key={count} filterList={filtersList} onFilterClick={handleFilterClick}/>
                    })
                }
            </div>
         </section>
    )
};
