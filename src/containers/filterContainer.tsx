import React, {FC, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import FilterList from '../components/filterList';
import { IFilter, FilterValue } from '../types/types';
import { addFilter, removeFilter, clearFilters, selectChosenFilters } from '../store/slices/exercisesSlice'
import { useSearchParams } from 'react-router-dom';

interface FilterContainerProps {
    filters: IFilter[]
}

export const FilterContainer: FC<FilterContainerProps> = ({filters}) => {
    const dispatch = useAppDispatch();
    const [filterSearchParams, setFilterSearchParams] = useSearchParams();
    const chosenFilters = useAppSelector(selectChosenFilters);

    const isFilterChosen = (filterValue: FilterValue) => {
        const filterGroup = chosenFilters.find(filter => filter.filterGroup === filterValue.filterGroup);
        if (filterGroup) {
            return filterGroup.values.includes(filterValue.value);
        }
        return false;
    }
    const handleFilterClick = (filterChosen: FilterValue) => {
        if (isFilterChosen(filterChosen)) {
            return dispatch(removeFilter(filterChosen));
        }
        return dispatch(addFilter(filterChosen));
    }

    const handleClearButtonClick = () => {
        dispatch(clearFilters());
    }
    const updateFilterSearchParams = (chosenFilters: IFilter[]) => {
        const params = new URLSearchParams();
        chosenFilters.forEach(chosenFilter => {
            if (chosenFilter.values.length === 0) {
                return params.delete(chosenFilter.filterGroup);
            }
            const valuesString = chosenFilter.values.join('%');
            params.append(chosenFilter.filterGroup, valuesString);
        })
        setFilterSearchParams(params);
    }

    useEffect(() => {
        updateFilterSearchParams(chosenFilters);
    }, [chosenFilters])

    useEffect(() => {
        const equipmentValues = filterSearchParams.get('Equipment')?.split('%');
        const muscleGroupValues = filterSearchParams.get('Muscle group')?.split('%');
        equipmentValues?.forEach(equipment => {
            dispatch(addFilter({
                filterGroup: 'Equipment',
                value: equipment
            }))
        })
        muscleGroupValues?.forEach(equipment => {
            dispatch(addFilter({
                filterGroup: 'Muscle group',
                value: equipment
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
                    filters.map((filtersList, count) => {
                        return <FilterList isFilterChosen={isFilterChosen} key={count} filterList={filtersList} onFilterClick={handleFilterClick}/>
                    })
                }
                {chosenFilters.some(chosenFilter => chosenFilter.values.length !==0) ? <button onClick={handleClearButtonClick} className="button">Clear all</button>: ''}
            </section>
         </section>
    )
};
