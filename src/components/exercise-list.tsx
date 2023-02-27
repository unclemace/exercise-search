import React, {FC} from 'react';
import {EquipmentType, IExercise} from "../types/types";
import ExerciseCard from './exercise-card';

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