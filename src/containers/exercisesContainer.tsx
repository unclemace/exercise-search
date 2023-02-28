import React, { FC, useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";
import {EquipmentType, IExercise, isEquipment, MuscleGroupType} from "../types/types";
import { selectEquipment, selectMuscleGroup } from "../store/slices/filterSlice";
import ExerciseList from "../components/exercise-list";
import exerciseList from "../components/exercise-list";

interface ExercisesContainerProps {
    exercises: IExercise[];
}
export const ExercisesContainer:FC<ExercisesContainerProps> = ({exercises}) => {
    const chosenEquipment = useAppSelector(selectEquipment);
    const chosenMuscleGroup = useAppSelector(selectMuscleGroup);
    const filterByEquipment = (exercises: IExercise[], chosenEquipment: EquipmentType[]) => {
        return exercises.filter((exercise) => {
            if (chosenEquipment.length === 0) {
                return exercises;
            }
            else  {
                return chosenEquipment.indexOf(exercise.requiredEquipment) !== -1
            }
        })

    }
    const filterByMuscleGroup = (exercises: IExercise[], chosenMuscleGroup: MuscleGroupType[]) => {
        if( chosenMuscleGroup.length === 0) {
            return exercises;
        }
        else {
            return exercises.filter(exercise => {
                console.log(chosenMuscleGroup.every(group => exercise.muscleGroup.includes(group)));
                return chosenMuscleGroup.every(group => exercise.muscleGroup.includes(group))
            })
        }
    }
    const filterExercises = (equipment:EquipmentType[], muscleGroup: MuscleGroupType[]) => {
        const filteredByEquipment = filterByEquipment(exercises, equipment);
        const filteredByMuscleGroup = filterByMuscleGroup(filteredByEquipment, muscleGroup);
        return filteredByMuscleGroup;

    }

    const filteredExercises = filterExercises(chosenEquipment, chosenMuscleGroup );

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