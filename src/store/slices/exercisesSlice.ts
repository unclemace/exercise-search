import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from '../store';
import {IExercise, IFilter} from "../../types/types";

const compareFilters = (filter1: IFilter, filter2: IFilter) => {
    const keys1 = Object.keys(filter1);
    const keys2 = Object.keys(filter2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (filter1[key as keyof IFilter] !== filter2[key as keyof IFilter]) {
            return false;
        }
    }
    return true;
}
export interface ExercisesSlice {
    exercises: IExercise[];
    chosenFilters: IFilter[];
}

const initialState: ExercisesSlice = {
    exercises: [],
    chosenFilters: [],
};

export const exercisesSlice = createSlice( {
    name: 'exercises',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<IFilter>) => {
            state.chosenFilters.push(action.payload);
        },
        removeFilter: (state, action: PayloadAction<IFilter>) => {
            state.chosenFilters = state.chosenFilters.filter(filter => !compareFilters(filter, action.payload))
        },
        clearFilters: (state) => {
            state.chosenFilters = [];
        },
        setExercises: (state, action: PayloadAction<IExercise[]>) => {
            state.exercises = action.payload;
        }
    }
})
export const { addFilter, removeFilter, clearFilters, setExercises } = exercisesSlice.actions;
export const selectExercises = (state: RootState) => {
    return state.exercises.exercises;
}
export const selectChosenFilters = (state: RootState) => {
    return state.exercises.chosenFilters;
}
export default exercisesSlice.reducer