import React, { FC, useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";
import {EquipmentType, IExercise, MuscleGroupType} from "../types/types";
import { selectEquipment } from "../store/slices/filterSlice";
import ExerciseList from "../components/exercise-list";

interface ExercisesContainerProps {
    exercises: IExercise[];
}
export const ExercisesContainer:FC<ExercisesContainerProps> = ({exercises}) => {
    const chosenEquipment = useAppSelector(selectEquipment);
    const filterExercises = (chosenEquipment:EquipmentType[], muscleGroup: MuscleGroupType[]) => {
        return exercises.filter((exercise) => {
            if (chosenEquipment.length === 0) {
                return exercises;
            }
            else  {
                return chosenEquipment.indexOf(exercise.requiredEquipment) !== -1;
            }
        })
    }
    const filteredExercises = filterExercises(chosenEquipment,[] );

    return (
        <div className='exercises'>
            <header>
                <h2>Exercise Search</h2>
                <div className='searchbar-container'>
                    <input type='text' placeholder='Find exercise' className='exercises__search-bar'/>
                    <i></i>
                </div>
            </header>
            <div className='exercises__container'>
                <ExerciseList exercises={filteredExercises}/>
            </div>
        </div>
    )
}