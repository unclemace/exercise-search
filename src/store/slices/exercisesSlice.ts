import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store";
import {IExercise, IFilter} from "../../types/types";

const isFitsByMuscleGroup = (exercise: IExercise, chosenMuscleGroups: IFilter[]) => {
    if (chosenMuscleGroups.length === 0 ) {
        return true
    }
    else {
        const muscleGroupArray: string[] = [];
        chosenMuscleGroups.forEach(chosenMuscleGroup => muscleGroupArray.push(chosenMuscleGroup.name));
        return muscleGroupArray.some(group => exercise.muscleGroup.includes(group));
    }
}
const isFitsByEquipment = (exercise: IExercise, chosenEquipment: IFilter[]) => {
    if (chosenEquipment.length === 0) {
        return true;
    }
    else {
        const equipmentArray: string[] = [];
        chosenEquipment.forEach(equipment => equipmentArray.push(equipment.name));
        return equipmentArray.includes(exercise.requiredEquipment);

    }
}
const filterExercises = (exercises: IExercise[], chosenFilters: IFilter[]) => {
    const muscleGroupFilters = chosenFilters.filter(filter => filter.filterGroup === 'Muscle group');
    const equipmentFilters = chosenFilters.filter(filter => filter.filterGroup === 'Equipment');
    return exercises.filter(exercise => {
        exercise.visible = isFitsByEquipment(exercise, equipmentFilters) && isFitsByMuscleGroup(exercise, muscleGroupFilters);
        return true;
    });
}
interface ExercisesSlice {
    exercises: IExercise[];
    chosenFilters: IFilter[];
}

const initialState: ExercisesSlice = {
    exercises: [
        {
            name: 'Pull up',
            description: 'Pull-ups are a functional bodyweight exercise that is great for building upper-body strength',
            imageSrc: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
            requiredEquipment: 'horizontal bar',
            muscleGroup: ['back', 'biceps'],
            visible: true,
        },
        {
            name: 'Push up',
            description: 'Pull-ups are a functional bodyweight exercise that is great for building upper-body strength',
            imageSrc: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
            requiredEquipment: 'body only',
            muscleGroup: ['shoulders'],
            visible: true,
        },
        {
            name: 'Bench press',
            description: 'Pull-ups are a functional bodyweight exercise that is great for building upper-body strength',
            imageSrc: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
            requiredEquipment: 'kettlebells',
            muscleGroup: ['legs', 'chest' ],
            visible: true,
        },
        {
            name: 'Dead lift',
            description: 'Pull-ups are a functional bodyweight exercise that is great for building upper-body strength',
            imageSrc: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
            requiredEquipment: 'bands',
            muscleGroup: ['legs', 'triceps'],
            visible: true,
        }
    ],
    chosenFilters: []
};

export const exercisesSlice = createSlice( {
    name: 'exercises',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<IFilter>) => {
            state.chosenFilters.push(action.payload);
            filterExercises(state.exercises, state.chosenFilters);
        },
        removeFilter: (state, action: PayloadAction<IFilter>) => {
            state.chosenFilters = state.chosenFilters.filter(filter => {
                if (filter.filterGroup === action.payload.filterGroup) {
                    return filter.name !== action.payload.name
                }
                else {
                    return true;
                }
            })
            filterExercises(state.exercises, state.chosenFilters);
        }
    }
})
export const { addFilter, removeFilter } = exercisesSlice.actions;
export const selectExercises = (state: RootState) => {
    return state.exercises.exercises;
}
export const selectChosenFilters = (state: RootState) => {
    return state.exercises.chosenFilters;
}
export default exercisesSlice.reducer