import React, {FC, useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import ExerciseList from '../components/exerciseList';
import SearchBar from '../components/searchBar';
import LoadingSpinner from '../components/loadingSpinner';
import { fetchExercises, selectExercises } from '../store/slices/exercisesSlice';
import { IExercise } from '../types/types';

export const ExercisesContainer:FC = () => {
    const exercises = useAppSelector(selectExercises);
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const status = useAppSelector(state => state.exercises.status);
    const dispatch = useAppDispatch();
    const visibleExercises = (exercises: IExercise[]) => {
        return exercises.filter(exercise => exercise.visible);
    }
    const handleSearchChange = (input: string) => {
        if (input.length === 0) {
            return setFilteredExercises(visibleExercises(exercises));
        }
        else {
            const editedInput = input.toLowerCase();
            const matchedExercises = visibleExercises(exercises).filter(exercise => {
                return exercise.name.toLowerCase().startsWith(editedInput)
            })
            return setFilteredExercises(matchedExercises);
        }
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExercises());
        }
        setFilteredExercises(visibleExercises(exercises));
    }, [exercises, status])

    return (
        <section className='exercises'>
            <header>
                <h2>Exercise Search</h2>
                <SearchBar placeholder={'Search Exercises'} onInputChange={handleSearchChange}/>
            </header>
            <div className='exercises__container'>
                {status === 'loading' ? <LoadingSpinner/>:<ExerciseList exercises={filteredExercises}/>}
            </div>
        </section>
    )
}