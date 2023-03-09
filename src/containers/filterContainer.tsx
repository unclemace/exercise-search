import React, {FC, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import FilterList from '../components/filterList';
import { IFilter } from '../types/types';
import { addFilter, removeFilter, clearFilters, selectChosenFilters } from '../store/slices/exercisesSlice'
import { useSearchParams } from 'react-router-dom';

interface FilterContainerProps {
    filters: IFilter[]
}

export const FilterContainer: FC<FilterContainerProps> = ({filters}) => {
    const dispatch = useAppDispatch();
    const [filterSearchParams, setFilterSearchParams] = useSearchParams();
    const chosenFilters = useAppSelector(selectChosenFilters);

    const isFilterChosen = (filterItem: IFilter) => {
        const filterFound = chosenFilters.find(chosenFilter => {
            if(chosenFilter.filterGroup === filterItem.filterGroup) {
                return chosenFilter.name === filterItem.name
            }
            return false;
        })
        return !!filterFound;
    }

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
    const sortedFilters = sortByGroup(filters, layers);
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

    const handleClearButtonClick = () => {
        dispatch(clearFilters());
    }
    const updateFilterSearchParams = (chosenFilters: IFilter[]) => {
        const params = new URLSearchParams();
        chosenFilters.forEach(chosenFilter => {
            params.append(chosenFilter.filterGroup, chosenFilter.name);
        })
        setFilterSearchParams(params);
    }

    useEffect(() => {
        updateFilterSearchParams(chosenFilters);
    }, [chosenFilters])

    useEffect(() => {
        const equipmentFilters = filterSearchParams.getAll('Equipment');
        const muscleGroupFilters = filterSearchParams.getAll('Muscle group');
        equipmentFilters.forEach(filter => {
            dispatch(addFilter({
                filterGroup: 'Equipment',
                name: filter
            }))
        })
        muscleGroupFilters.forEach(filter => {
            dispatch(addFilter({
                filterGroup: 'Muscle group',
                name: filter
            }))
        })
    }, [])

    return (
         <section className='filter'>
            <header>
              <h2>Filters</h2>
            </header>
            <section className='filter__container'>
                {
                    sortedFilters.map((filtersList, count) => {
                        return <FilterList isFilterChosen={isFilterChosen} key={count} filterList={filtersList} onFilterClick={handleFilterClick}/>
                    })
                }
                {chosenFilters.length > 0 ? <button onClick={handleClearButtonClick} className="button">Clear all</button>: ''}
            </section>
         </section>
    )
};
