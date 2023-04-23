import React, {FC, useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import ExerciseList from '../components/exerciseList';
import SearchBar from '../components/searchBar';
import LoadingSpinner from '../components/loadingSpinner';
import { selectChosenFilters, selectExercises, setExercises } from '../store/slices/exercisesSlice';
import { filterExercises } from '../services/exercisesService';

export const ExercisesContainer:FC = () => {
    const exercises = useAppSelector(selectExercises);
    const chosenFilters = useAppSelector(selectChosenFilters);
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const [loading, setLoading] = useState<boolean>(true)
    const dispatch = useAppDispatch();
    const handleSearchChange = (input: string) => {
        if (input.length === 0) {
            return setFilteredExercises(exercises);
        }
        else {
            const editedInput = input.toLowerCase();
            const matchedExercises = exercises.filter(exercise => {
                return exercise.name.toLowerCase().startsWith(editedInput)
            })
            return setFilteredExercises(matchedExercises);
        }
    }

    useEffect( () => {
        (async () => {
            try {
                setLoading(true);
                const exercises = await filterExercises(chosenFilters, {rated: true});
                if (exercises){
                    dispatch(setExercises(exercises));
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [chosenFilters])

    useEffect(() => {
        setFilteredExercises(exercises);
    }, [exercises])

    return (
        <section className='exercises'>
            <header>
                <h2>Exercise Search</h2>
                <SearchBar placeholder={'Search Exercises'} onInputChange={handleSearchChange}/>
            </header>
            <div className='exercises__container'>
                {loading ? <LoadingSpinner/>:<ExerciseList exercises={filteredExercises}/>}
            </div>
        </section>
    )
}