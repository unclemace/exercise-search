import React, {FC, useEffect, useRef, useState} from "react";
import { useAppSelector } from "../hooks/hooks";
import {EquipmentType, IExercise, isEquipment, MuscleGroupType} from "../types/types";
import { selectEquipment, selectMuscleGroup } from "../store/slices/filterSlice";
import ExerciseList from "../components/exerciseList";
import exerciseList from "../components/exerciseList";
import {SearchBar} from "../components/searchBar";

interface ExercisesContainerProps {
    exercises: IExercise[];
}
export const ExercisesContainer:FC<ExercisesContainerProps> = ({exercises}) => {
    const chosenEquipment = useAppSelector(selectEquipment);
    const chosenMuscleGroup = useAppSelector(selectMuscleGroup);
    const [filteredExercises, setFilteredExercises] = useState(exercises);
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
    const handleSearchChange = (input: string) => {
        if (input.length === 0) {
            return setFilteredExercises(filterExercises(chosenEquipment, chosenMuscleGroup ))
        }
        const editedInput = input.toLowerCase();
        const matchedExercises = filteredExercises.filter(exercise => {
            return exercise.name.toLowerCase().startsWith(editedInput);
        })
        return setFilteredExercises(matchedExercises);
    }

    useEffect(() => {
        setFilteredExercises(filterExercises(chosenEquipment, chosenMuscleGroup ))
    }, [chosenEquipment, chosenMuscleGroup]);

    return (
        <section className='exercises'>
            <header>
                <h2>Exercise Search</h2>
                <SearchBar placeholder={'Search Exercises'} onInputChange={handleSearchChange}/>
            </header>
            <div className='exercises__container'>
                <ExerciseList exercises={filteredExercises}/>
            </div>
        </section>
    )
}