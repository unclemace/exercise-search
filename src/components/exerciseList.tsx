import React, { FC } from 'react';
import { IExercise } from '../types/types';
import ExerciseCard from './exerciseCard';

interface ExercisesListProps {
    exercises: IExercise[];

}

const ExercisesList:FC<ExercisesListProps> = ({exercises}) => {
    return (
        <ul className='exercises__list'>
            {exercises.map((exercise,count) => {
                return (
                    <ExerciseCard key={count} exercise={exercise}/>
                )
            })}
        </ul>
    )
}

export default ExercisesList;