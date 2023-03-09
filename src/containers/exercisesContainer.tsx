import React, {FC, useEffect, useState} from 'react';
import { useAppSelector } from '../hooks/hooks';

import ExerciseList from '../components/exerciseList';
import { SearchBar } from '../components/searchBar';
import LoadingSpinner from '../components/loadingSpinner';
import { selectExercises } from '../store/slices/exercisesSlice';
import { IExercise } from '../types/types';

export const ExercisesContainer:FC = () => {
    const exercises = useAppSelector(selectExercises);
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const [isLoading, setIsLoading] = useState(true);
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

    const enableLoading = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }

    useEffect(() => {
        setFilteredExercises(visibleExercises(exercises));
        enableLoading();
    }, [exercises])

    return (
        <section className='exercises'>
            <header>
                <h2>Exercise Search</h2>
                <SearchBar placeholder={'Search Exercises'} onInputChange={handleSearchChange}/>
            </header>
            <div className='exercises__container'>
                {isLoading ? <LoadingSpinner/>:<ExerciseList exercises={filteredExercises}/>}
            </div>
        </section>
    )
}